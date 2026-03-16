import { Card, CardContent, Typography } from "@mui/material";

export default function GenreCard({ genre, onClick }) {
  return (
    <Card
      sx={{
        width: 200,
        margin: 2,
        cursor: "pointer",
        "&:hover": { boxShadow: 6 }
      }}
      onClick={() => onClick(genre)}
    >
      <CardContent>
        <Typography variant="h6">{genre}</Typography>
      </CardContent>
    </Card>
  );
}