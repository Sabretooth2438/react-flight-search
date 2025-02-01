import { CircularProgress, Box } from "@mui/material";

const Loader = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: { xs: "150px", sm: "200px" },
    }}
  >
    <CircularProgress aria-label="Loading" />
  </Box>
);

export default Loader;
