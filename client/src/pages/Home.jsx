import React, { useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import GenreCard from "../components/GenreCard";
import RandomMovieWindow from "../components/RandomMovieWindow";

export default function Home() {
  const genres = [
    "Action",
    "Comedy",
    "Drama",
    "Horror",
    "Sci-Fi",
    "Adventure",
    "Romance",
  ];

  const warnings = ["Drugs", "Gore", "Sexual Content", "Strong Language"];

  const [selectedGenre, setSelectedGenre] = useState(null);
  const [excludedWarnings, setExcludedWarnings] = useState([]);

  const handleWarningChange = (warning) => {
    setExcludedWarnings((prev) =>
      prev.includes(warning)
        ? prev.filter((w) => w !== warning)
        : [...prev, warning],
    );
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Pick a Genre
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {genres.map((genre) => (
          <GenreCard key={genre} genre={genre} onClick={setSelectedGenre} />
        ))}
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Exclude Warnings</Typography>

        <FormGroup row>
          {warnings.map((warning) => (
            <FormControlLabel
              key={warning}
              control={
                <Checkbox
                  checked={excludedWarnings.includes(warning)}
                  onChange={() => handleWarningChange(warning)}
                />
              }
              label={warning}
            />
          ))}
        </FormGroup>
      </Box>

      {selectedGenre && (
        <RandomMovieWindow
          genre={selectedGenre}
          excludedWarnings={excludedWarnings}
        />
      )}
    </Box>
  );
}
