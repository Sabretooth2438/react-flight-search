import { Card, CardContent, Typography, Box, Avatar, Divider } from "@mui/material";

const FlightCard = ({ flight }) => {
  const { price, legs } = flight;
  const leg = legs[0];

  return (
    <Card
      sx={{
        mb: 2,
        p: 2,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: { xs: "100%", sm: "70%" } }}>
        {/* Airline & Flight Info */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src={leg.carriers.marketing[0].logoUrl}
            alt={leg.carriers.marketing[0].name}
            sx={{ width: 56, height: 56 }}
          />
          <Typography variant="h6">{leg.carriers.marketing[0].name}</Typography>
        </Box>

        {/* Departure & Arrival Info */}
        <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
          <Typography variant="body1">
            {leg.origin.displayCode} → {leg.destination.displayCode}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(leg.departure).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {" - "}
            {new Date(leg.arrival).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        </Box>

        {/* Duration & Stops */}
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {leg.durationInMinutes} min | {leg.stopCount === 0 ? "Direct" : `${leg.stopCount} Stop(s)`}
        </Typography>
      </Box>

      {/* Divider: Vertical on larger screens, horizontal on smaller */}
      <Divider
        orientation={["vertical", "horizontal"]}
        flexItem
        sx={{
          my: { xs: 2, sm: 0 },
          mx: { xs: 0, sm: 2 },
        }}
      />

      {/* Price Info */}
      <CardContent sx={{ p: 0 }}>
        <Typography variant="h5" color="primary">
          ${price.formatted}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FlightCard;
