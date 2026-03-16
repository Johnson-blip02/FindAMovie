import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";

export default function RandomMovieWindow({ genre, excludedWarnings }) {
  const [movie, setMovie] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const fetchMovie = () => {
    let url = `http://localhost:5000/movies/random?genre=${encodeURIComponent(genre)}`;

    if (excludedWarnings && excludedWarnings.length > 0) {
      url += `&exclude=${excludedWarnings.join(",")}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchMovie();
  }, [genre, refresh, excludedWarnings]);

  if (!movie) return <Typography>Loading...</Typography>;

  return (
    <Card sx={{ maxWidth: 500, marginTop: 3 }}>
      <CardContent>
        <Typography variant="h6">{movie.name}</Typography>

        {/* Genre chips */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", marginTop: 1 }}>
          {movie.genre.map((g, index) => (
            <Chip key={index} label={g} size="small" />
          ))}
        </Box>

        {/* Warning chips */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", marginTop: 1 }}>
          {movie.warning.map((w, index) => (
            <Chip
              key={index}
              label={w}
              size="small"
              color="warning"
              variant="outlined"
            />
          ))}
        </Box>

        <Typography variant="body1" sx={{ marginTop: 1 }}>
          {movie.description}
        </Typography>

        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={() => setRefresh((prev) => prev + 1)}
        >
          Get Another Random {genre} Movie
        </Button>
      </CardContent>
    </Card>
  );
}
