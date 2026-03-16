const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", async (req, res) => {
    try {
      const movies = await db.collection("movieCollection").find().toArray();
      res.json(movies);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/random", async (req, res) => {
    try {
      const genre = req.query.genre;
      const exclude = req.query.exclude;

      let movies = await db.collection("movieCollection").find().toArray();

      if (genre) {
        movies = movies.filter((movie) => movie.genre.includes(genre));
      }

      if (exclude) {
        const excludedWarnings = exclude.split(",");

        movies = movies.filter(
          (movie) =>
            !movie.warning.some((warning) =>
              excludedWarnings.includes(warning),
            ),
        );
      }

      if (movies.length === 0) {
        return res.json(null);
      }

      const randomIndex = Math.floor(Math.random() * movies.length);
      res.json(movies[randomIndex]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
