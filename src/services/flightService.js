import axios from 'axios'
import handleErrors from '../utils/handleErrors'

const API_BASE_URL = 'https://sky-scrapper.p.rapidapi.com'

// Axios instance with default settings.
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
    'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com',
  },
})

console.log("API Key:", import.meta.env.VITE_API_KEY);

// Get locale info.
export const getLocale = async () => {
  try {
    const response = await apiClient.get('/api/v1/getLocale')
    return response.data?.data || null
  } catch (error) {
    return handleErrors(error)
  }
}

// Check server status.
export const checkServer = async () => {
  try {
    const response = await apiClient.get('/api/v1/checkServer')
    return response.data?.data || null
  } catch (error) {
    return handleErrors(error)
  }
}

// Get configuration.
export const getConfig = async () => {
  try {
    const response = await apiClient.get('/api/v1/getConfig')
    return response.data?.data || null
  } catch (error) {
    return handleErrors(error)
  }
}

// Get nearby airports.
export const getNearByAirports = async (lat, lng, locale = 'en-US') => {
  try {
    const response = await apiClient.get('/api/v1/flights/getNearByAirports', {
      params: { lat, lng, locale },
    })
    return response.data?.data || null
  } catch (error) {
    return handleErrors(error)
  }
}

// Search for an airport.
export const searchAirport = async (query, locale = 'en-US') => {
  try {
    const response = await apiClient.get('/api/v1/flights/searchAirport', {
      params: { query, locale },
    })
    return response.data?.data || []
  } catch (error) {
    console.error('Error in searchAirport:', error)
    return []
  }
}

// Search flights (v2).
export const searchFlights = async (params) => {
  try {
    if (!params || Object.keys(params).length === 0) {
      console.warn('Missing search params.')
      return null
    }
    const response = await apiClient.get('/api/v2/flights/searchFlights', {
      params,
    })
    return response.data?.data?.context || null
  } catch (error) {
    return handleErrors(error)
  }
}

// Get completed flights.
export const getCompletedFlights = async (
  sessionId,
  maxRetries = 15,
  delay = 5000
) => {
  if (!sessionId) {
    console.warn('Invalid sessionId provided.')
    return null
  }

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await apiClient.get(
        '/api/v2/flights/searchFlightsComplete',
        {
          params: { sessionId },
        }
      )
      const data = response.data?.data
      const itineraries = data?.itineraries || []

      if (itineraries.length > 0) {
        return data
      } else {
        console.warn(`No flights found, retrying... (${i + 1}/${maxRetries})`)
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    } catch (error) {
      return handleErrors(error)
    }
  }

  console.warn('Exceeded maximum retries. Flights may still be processing.')
  return null
}

// Search incomplete flights.
export const searchIncomplete = async (
  sessionId,
  limit,
  carriersIds,
  currency = 'USD',
  market = 'en-US',
  countryCode = 'US'
) => {
  try {
    const response = await apiClient.get('/api/v1/flights/searchIncomplete', {
      params: { sessionId, limit, carriersIds, currency, market, countryCode },
    })
    return response.data?.data || null
  } catch (error) {
    return handleErrors(error)
  }
}

// Get flight details.
export const getFlightDetails = async (
  legs,
  sessionId,
  adults = 1,
  children,
  infants,
  currency = 'USD',
  locale = 'en-US',
  market = 'en-US',
  cabinClass = 'economy',
  countryCode = 'US'
) => {
  try {
    const legsParam = typeof legs === 'string' ? legs : JSON.stringify(legs)
    const response = await apiClient.get('/api/v1/flights/getFlightDetails', {
      params: {
        legs: legsParam,
        sessionId,
        adults,
        children,
        infants,
        currency,
        locale,
        market,
        cabinClass,
        countryCode,
      },
    })
    return response.data?.data || null
  } catch (error) {
    return handleErrors(error)
  }
}

// Get price calendar.
export const getPriceCalendar = async (
  originSkyId,
  destinationSkyId,
  fromDate,
  toDate,
  currency = 'USD'
) => {
  try {
    const response = await apiClient.get('/api/v1/flights/getPriceCalendar', {
      params: { originSkyId, destinationSkyId, fromDate, toDate, currency },
    })
    return response.data?.data || null
  } catch (error) {
    return handleErrors(error)
  }
}

// Search flights with multi stops.
export const searchFlightsMultiStops = async (
  legs,
  cabinClass = 'economy',
  adults = 1,
  sortBy = 'best',
  currency = 'USD',
  countryCode = 'US',
  market = 'en-US'
) => {
  try {
    const legsParam = typeof legs === 'string' ? legs : JSON.stringify(legs)
    const response = await apiClient.get(
      '/api/v1/flights/searchFlightsMultiStops',
      {
        params: {
          legs: legsParam,
          cabinClass,
          adults,
          sortBy,
          currency,
          countryCode,
          market,
        },
      }
    )
    return response.data?.data || null
  } catch (error) {
    return handleErrors(error)
  }
}

// Search flights everywhere.
export const searchFlightEverywhere = async (
  originEntityId,
  cabinClass = 'economy',
  journeyType = 'one_way',
  currency = 'USD',
  destinationEntityId,
  travelDate,
  returnDate,
  adults = 1,
  childAges
) => {
  try {
    const response = await apiClient.get(
      '/api/v2/flights/searchFlightEverywhere',
      {
        params: {
          originEntityId,
          cabinClass,
          journeyType,
          currency,
          destinationEntityId,
          travelDate,
          returnDate,
          adults,
          childAges,
        },
      }
    )
    return response.data?.data || null
  } catch (error) {
    return handleErrors(error)
  }
}

// Get flight everywhere details.
export const searchFlightEverywhereDetails = async (
  originSkyId,
  travelDate,
  returnDate,
  CountryId,
  oneWay = false,
  currency = 'USD'
) => {
  try {
    const response = await apiClient.get(
      '/api/v1/flights/searchFlightEverywhereDetails',
      {
        params: {
          originSkyId,
          travelDate,
          returnDate,
          CountryId,
          oneWay,
          currency,
        },
      }
    )
    return response.data?.data || null
  } catch (error) {
    return handleErrors(error)
  }
}

// Search web-complete flights.
export const searchFlightsWebComplete = async (
  originSkyId,
  destinationSkyId,
  originEntityId,
  destinationEntityId,
  date,
  returnDate,
  cabinClass = 'economy',
  adults = 1,
  childrens = 0,
  infants = 0,
  sortBy = 'best',
  limit,
  carriersIds,
  currency = 'USD',
  market = 'en-US',
  countryCode = 'US'
) => {
  try {
    const response = await apiClient.get(
      '/api/v2/flights/searchFlightsWebComplete',
      {
        params: {
          originSkyId,
          destinationSkyId,
          originEntityId,
          destinationEntityId,
          date,
          returnDate,
          cabinClass,
          adults,
          childrens,
          infants,
          sortBy,
          limit,
          carriersIds,
          currency,
          market,
          countryCode,
        },
      }
    )
    return response.data?.data || null
  } catch (error) {
    return handleErrors(error)
  }
}
