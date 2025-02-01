import { AppBar, Toolbar, Typography, Container } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* You can add a logo here if desired */}
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1, fontWeight: "bold", letterSpacing: 1 }}
          >
            Flight Search
          </Typography>
          {/* Future nav links can be added here */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
