import { Box, Typography } from '@mui/material';

export default function Licences() {
  return (
    <Box
      width="80%"
      margin="auto"
      padding="40px"
      backgroundColor="#f9f9f9"
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
    >
      <Typography
        variant="h2"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#333",
          borderBottom: "2px solid #eee",
          paddingBottom: "10px",
          marginBottom: "20px",
        }}
      >
        License
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: "1.2rem",
          lineHeight: 1.6,
          color: "#555",
          textAlign: "justify",
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        This Pokémon Pokédex project is created solely for learning and personal skill development as a front-end developer. The content and data, sourced from publicly available APIs, are used for non-commercial and training purposes only. This project is not intended for profit, licensing, or any commercial distribution. All Pokémon names, images, and related trademarks are the property of their respective copyright holders. This website serves as a practice project for individual growth and as a showcase in my personal portfolio.
      </Typography>
    </Box>
  );
}
