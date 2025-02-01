import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FlightResults from "./pages/FlightResults";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Container
        sx={{
          mt: { xs: 2, sm: 4 },
          px: { xs: 2, sm: 4 },
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<FlightResults />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
