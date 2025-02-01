import { Box, FormControl, InputLabel, Select, MenuItem, Slider, Typography } from "@mui/material";

const FilterOptions = ({ filters, setFilters }) => {
  const handleChange = ({ target: { name, value } }) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 2 },
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        alignItems: "center",
      }}
    >
      {/* Sort By Filter */}
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="sort-by-label">Sort By</InputLabel>
        <Select
          labelId="sort-by-label"
          name="sortBy"
          value={filters.sortBy}
          onChange={handleChange}
          label="Sort By"
        >
          <MenuItem value="best">Best</MenuItem>
          <MenuItem value="price_high">Cheapest</MenuItem>
          <MenuItem value="fastest">Fastest</MenuItem>
        </Select>
      </FormControl>

      {/* Stops Filter */}
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="stops-label">Stops</InputLabel>
        <Select
          labelId="stops-label"
          name="stops"
          value={filters.stops}
          onChange={handleChange}
          label="Stops"
        >
          <MenuItem value="any">Any</MenuItem>
          <MenuItem value="direct">Direct</MenuItem>
          <MenuItem value="one">1 Stop</MenuItem>
          <MenuItem value="twoOrMore">2+ Stops</MenuItem>
        </Select>
      </FormControl>

      {/* Price Slider */}
      <Box sx={{ minWidth: 200 }}>
        <Typography id="max-price-slider" gutterBottom>
          Max Price: ${filters.maxPrice}
        </Typography>
        <Slider
          name="maxPrice"
          value={filters.maxPrice}
          onChange={(e, newValue) =>
            setFilters((prev) => ({ ...prev, maxPrice: newValue }))
          }
          min={100}
          max={3000}
          step={50}
          aria-labelledby="max-price-slider"
        />
      </Box>
    </Box>
  );
};

export default FilterOptions;
