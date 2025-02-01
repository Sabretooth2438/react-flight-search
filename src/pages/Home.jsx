import { useState } from "react";
import { Container, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import FlightResults from "./FlightResults";
import FilterOptions from "../components/FilterOptions"
import { searchFlights } from "../services/flightService";

const Home = () => {
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: "best",
    stops: "any",
    maxPrice: 3000,
  });

  const handleSearch = async (params) => {
    setLoading(true);
    const session = await searchFlights(params);
    setSessionId(session);
    setLoading(false);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Search Flights
      </Typography>
      <SearchBar onSearch={handleSearch} />
      <FilterOptions filters={filters} setFilters={setFilters} />
      {sessionId && <FlightResults sessionId={sessionId} />}
    </Container>
  );
};

export default Home;
