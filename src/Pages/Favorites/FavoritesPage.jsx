import { Box, Typography, Grid, CardMedia, IconButton} from '@mui/material';
import { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const deleteFavorite = (id) => {
    const updatedFavorites = favorites.filter(pokemon => pokemon.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <Box width="80%" margin="auto" padding="20px" backgroundColor="#eeee">
      <Typography variant="h4" gutterBottom>Favorites</Typography>
      <Grid container spacing={2}>
        {favorites.map((pokemon) => (
          <Grid item xs={5} sm={4} md={3} key={pokemon.id}>
            <Link to={`/pokemon/${pokemon.id}`} style={{ textDecoration: 'none', color: "black" }}>
              <Box
               padding="10px"
               border="1px solid #ccc"
               borderRadius="8px"
               textAlign="center"
               backgroundColor="white"
              >
                <CardMedia component="img" image={pokemon.image} alt={pokemon.name} />
                <Typography variant="h6">#{pokemon.id}</Typography>
                <Typography variant="h6" fontWeight="bold">
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </Typography>
                <Typography variant="subtitle1">
                  {pokemon.types.map(type => type.charAt(0).toUpperCase() + type.slice(1)).join(" / ")}
                </Typography>
              </Box>
            </Link>
            <Box 
            display="flex"
            alignItems="center"
            justifyContent="center"
            backgroundColor="#FFADB0">
                <IconButton aria-label="delete" size="large" onClick={() => deleteFavorite(pokemon.id)}>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
