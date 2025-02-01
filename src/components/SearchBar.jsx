import { useState } from 'react'
import { Box, TextField, Button, Autocomplete, MenuItem } from '@mui/material'
import { searchAirport } from '../services/flightService'

const cabinClasses = [
  { label: 'Economy', value: 'economy' },
  { label: 'Premium Economy', value: 'premium_economy' },
  { label: 'Business', value: 'business' },
  { label: 'First Class', value: 'first' },
]

// Map short forms to full search terms.
const shortFormMapping = {
  NYC: 'New York',
  // Add additional mappings as needed.
}

const SearchBar = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    origin: null,
    destination: null,
    date: '',
    adults: 1,
    cabinClass: 'economy',
  })

  const [originOptions, setOriginOptions] = useState([])
  const [destinationOptions, setDestinationOptions] = useState([])

  const handleOriginInputChange = async (event, newInputValue) => {
    const input = newInputValue.trim()
    const query = shortFormMapping[input.toUpperCase()] || input
    if (query.length < 2) {
      setOriginOptions([])
      return
    }
    // Temporarily log the query and response:
    const response = await searchAirport(query, 'en-US')
    console.log('Query:', query, 'Response:', response)
    setOriginOptions(Array.isArray(response) ? response : [])
  }

  const handleDestinationInputChange = async (event, newInputValue) => {
    const input = newInputValue.trim()
    const query = shortFormMapping[input.toUpperCase()] || input
    if (query.length < 2) {
      setDestinationOptions([])
      return
    }
    const response = await searchAirport(query, 'en-US')
    console.log('Query:', query, 'Response:', response)
    setDestinationOptions(Array.isArray(response) ? response : [])
  }

  const handleSimpleChange = ({ target: { name, value } }) => {
    setSearchParams((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!searchParams.origin || !searchParams.destination) {
      alert('Please select both origin and destination airports.')
      return
    }
    const apiParams = {
      originSkyId: searchParams.origin.skyId,
      destinationSkyId: searchParams.destination.skyId,
      originEntityId: searchParams.origin.entityId,
      destinationEntityId: searchParams.destination.entityId,
      date: searchParams.date,
      adults: searchParams.adults,
      cabinClass: searchParams.cabinClass,
      sortBy: 'best',
      currency: 'USD',
      market: 'en-US',
      countryCode: 'US',
    }
    onSearch(apiParams)
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
      }}
    >
      {/* Origin Autocomplete */}
      <Autocomplete
        id="origin-autocomplete"
        options={originOptions}
        getOptionLabel={(option) => option.presentation?.title || ''}
        onInputChange={handleOriginInputChange}
        onChange={(event, newValue) =>
          setSearchParams((prev) => ({ ...prev, origin: newValue }))
        }
        renderOption={(props, option) => (
          <li {...props} key={`${option.skyId}-${option.entityId}`}>
            {option.presentation?.title || ''}
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Origin" required />
        )}
        sx={{ width: 150 }}
      />

      {/* Destination Autocomplete */}
      <Autocomplete
        id="destination-autocomplete"
        options={destinationOptions}
        getOptionLabel={(option) => option.presentation?.title || ''}
        onInputChange={handleDestinationInputChange}
        onChange={(event, newValue) =>
          setSearchParams((prev) => ({ ...prev, destination: newValue }))
        }
        renderOption={(props, option) => (
          <li {...props} key={`${option.skyId}-${option.entityId}`}>
            {option.presentation?.title || ''}
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Destination" required />
        )}
        sx={{ width: 150 }}
      />

      <TextField
        id="date"
        type="date"
        name="date"
        value={searchParams.date}
        onChange={handleSimpleChange}
        required
        InputLabelProps={{ shrink: true }}
        sx={{ width: 150 }}
      />

      <TextField
        id="adults"
        type="number"
        label="Adults"
        name="adults"
        value={searchParams.adults}
        onChange={handleSimpleChange}
        inputProps={{ min: 1 }}
        required
        sx={{ width: 100 }}
      />

      <TextField
        id="cabinClass"
        select
        label="Cabin Class"
        name="cabinClass"
        value={searchParams.cabinClass}
        onChange={handleSimpleChange}
        sx={{ width: 150 }}
      >
        {cabinClasses.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <Button type="submit" variant="contained">
        Search
      </Button>
    </Box>
  )
}

export default SearchBar
