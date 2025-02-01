import { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import FlightCard from "../components/FlightCard";
import { getCompletedFlights } from "../services/flightService";
import Loader from "../components/Loader";

const FlightResults = ({ sessionId }) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const fetchFlights = async () => {
      if (!sessionId) return;
      setLoading(true);
      setStatusMessage("Searching for flights...");
      const data = await getCompletedFlights(sessionId);
      if (data && data.itineraries && data.itineraries.length > 0) {
        setFlights(data.itineraries);
        setStatusMessage("");
      } else {
        // If after polling there are still no itineraries:
        setStatusMessage("Flight search is still processing. Please try again later.");
      }
      setLoading(false);
    };

    fetchFlights();
  }, [sessionId]);

  return (
    <Container sx={{ mt: { xs: 2, sm: 4 } }}>
      <Typography variant="h5" gutterBottom>
        Flight Results
      </Typography>
      {loading ? (
        <Loader />
      ) : flights.length > 0 ? (
        <Grid container spacing={2}>
          {flights.map((flight) => (
            <Grid item xs={12} sm={6} md={4} key={flight.id}>
              <FlightCard flight={flight} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>{statusMessage || "No flights found."}</Typography>
      )}
    </Container>
  );
};

export default FlightResults;
