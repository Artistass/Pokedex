import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Card, CardContent, CardMedia, Box, Button, Alert } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const API_URL = 'https://pokeapi.co/api/v2';

function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [weaknesses, setWeaknesses] = useState([]);
  const [immunity, setImmunity] = useState([]);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await axios.get(`${API_URL}/pokemon/${id}`);
        const pokemonData = response.data;
        setPokemon(pokemonData);

        // Fetch weaknesses based on Pokémon types
        const typeUrls = pokemonData.types.map(type => `${API_URL}/type/${type.type.name}`);
        const typeResponses = await Promise.all(typeUrls.map(url => axios.get(url)));

        // Extract weaknesses and immunities from each type
        const allWeaknesses = typeResponses.flatMap(res => 
          res.data.damage_relations.double_damage_from.map(type => type.name)
        );
        const allImmunity = typeResponses.flatMap(res => 
          res.data.damage_relations.no_damage_from.map(type => type.name)
        );

        // Remove duplicates by converting to a Set, then back to an array
        setWeaknesses([...new Set(allWeaknesses)]);
        setImmunity([...new Set(allImmunity)]);
      } catch (error) {
        console.error(error);
        showAlert('error', "Failed to load Pokémon details.");
      }
    }
    fetchPokemon();
  }, [id]);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    // Clear the alert after 3 seconds
    setTimeout(() => {
      setAlert({ type: '', message: '' });
    }, 3000);
  };

  const addToFavorites = () => {
    try {
      const collection = JSON.parse(localStorage.getItem("favorites")) || [];
      if (!collection.some((item) => item.id === pokemon.id)) {
        collection.push({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other["official-artwork"].front_default,
          types: pokemon.types.map(type => type.type.name)
        });
        localStorage.setItem("favorites", JSON.stringify(collection));
        showAlert('success', `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} was successfully added to favorites!`);
      } else {
        showAlert('info', `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} is already in your favorites.`);
      }
    } catch (error) {
      console.error(error);
      showAlert('error', "Failed to add Pokémon to favorites.");
    }
  };

  if (!pokemon) return <Typography>Loading...</Typography>;

  return (
    <Box width="80%" margin="auto" padding="0">
      {alert.message && (
        <Alert 
          severity={alert.type}
          sx={{ 
            mb: 2,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000, // Ensure it's above other elements
            borderRadius: 0, // Optional: remove border radius for full-width
            textAlign: "center" // Center-align text
          }}
        >
          {alert.message}
        </Alert>
      )}
      
      <Card sx={{ backgroundColor: "rgba(238, 238, 238, 0.95)" }}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography variant="h3" component="h2" margin="2rem 0">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "left", marginLeft: "1rem", color: "grey", fontSize: { xs: "16px", sm: "20px", lg: "22px" } }}>
            #{pokemon.id}
          </Typography>
        </Box>
        
        <CardMedia
          component="img"
          image={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          title={pokemon.name}
          sx={{
            display: "block",
            margin: "0 auto",
            width: { xs: "30rem" },
            maxWidth: "100%",
            height: "auto"
          }}
        />
        
        <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold", color: "black", margin: "2rem 0", fontSize: { xs: "30px" } }}>
          Pokémon Details
        </Typography>

        <CardContent sx={{ display: { xs: "block", md: "flex" }, alignItems: 'center', justifyContent: "space-between", textAlign: 'center', p: 3, backgroundColor: '#E9EAee', boxShadow: 10, width: "60%", margin: "1rem auto" }}>
          <Box sx={{ textAlign: { xs: "center", lg: "left" }, marginRight: "1rem" }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: "1rem"}}>
              Types: <span style={{ color: '#039be5', fontSize: "20px" }}>
                {pokemon.types.map(type => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)).join(', ')}
              </span>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: "1rem" }}>
              Abilities: <span style={{ color: '#039be5', fontSize: "20px"}}>
                {pokemon.abilities.map(ability => ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)).join(', ')}
              </span>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: "1rem" }}>
              Weaknesses: <span style={{ color: '#039be5', fontSize: "20px" }}>
                {weaknesses.map(weakness => weakness.charAt(0).toUpperCase() + weakness.slice(1)).join(', ')}
              </span>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: "1rem" }}>
              Immunity: <span style={{ color: '#039be5', fontSize: "20px" }}>
                {immunity.length > 0 ? immunity.map(type => type.charAt(0).toUpperCase() + type.slice(1)).join(', ') : '-'}
              </span>
            </Typography>
          </Box>

          <Box sx={{ width: { xs: "180px", lg: "300px" }, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", margin: "auto" }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1, mt: 2}}>Base Stats:</Typography>
            <Box component="ul" sx={{ padding: 0, listStyle: 'none', m: 0, width: '100%' }}>
              {pokemon.stats.map(stat => (
                <Box component="li" key={stat.stat.name} sx={{ mb: 0.5, display: 'flex', justifyContent: 'space-between', backgroundColor: '#039be5', borderRadius: 1, p: 1, width: '100%' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: "#fff" }}>{stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: "#fff" }}>{stat.base_stat}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </CardContent>

        <Box display="flex" justifyContent="center" margin="1rem 0" padding="1rem">
          <Button onClick={() => navigate(-1)} variant="contained">Back</Button>
          <Button onClick={addToFavorites} variant="contained" startIcon={<AddCircleIcon />} sx={{ marginLeft: "1rem" }}>
            Favorites
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default PokemonDetail;
