import { Box, Typography, Grid, Button, CardMedia } from '@mui/material';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom'
import SearchBar from '../../components/SearchBar/SearchBar';

const API_URL = 'https://pokeapi.co/api/v2';

export default function HomePage() {
  const [pokemonData, setPokemonData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [fetching, setFetching] = useState(false); // Track if fetch is in progress
  const limit = 12;
  const initialFetchDone = useRef(false); // To prevent duplicate initial fetch

  async function fetchPoke() {
    if (fetching) return; // If already fetching, exit
    setFetching(true); // Set fetching state to true

    try {
      const response = await axios.get(`${API_URL}/pokemon?offset=${offset}&limit=${limit}`);
      const basicData = response.data.results;

      // Fetch detailed data for each Pokémon to get the sprite URL
      const detailedData = await Promise.all(
        basicData.map(async (pokemon) => {
          const pokemonDetails = await axios.get(pokemon.url);
          return {
            id: pokemonDetails.data.id,
            name: pokemon.name,
            image: pokemonDetails.data.sprites.other["official-artwork"].front_default,
            types: pokemonDetails.data.types.map((typeInfo) => typeInfo.type.name),
          };
        })
      );

      setPokemonData((prevData) => [...prevData, ...detailedData]);
      setOffset((prevOffset) => prevOffset + limit);
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false); // Reset fetching state
    }
  }

  useEffect(() => {
    if (!initialFetchDone.current) {
      fetchPoke();
      initialFetchDone.current = true; // Mark initial fetch as done
    }
  }, []);

  return (
    <Box width="80%" margin="auto" padding="20px" backgroundColor="#eeee">
      <hr style={{marginBottom: "1rem"}}/>
      <SearchBar/>
      <hr style={{margin: "1rem 0"}}/>
      <Typography variant="h4" gutterBottom>Pokémon List</Typography>
      <Grid container spacing={2}>
        {pokemonData.map((pokemon, index) => (
          <Grid item xs={5} sm={4} md={3} key={index}>
            <Link to={`/pokemon/${pokemon.id}`} style={{ textDecoration: 'none', color: "black" }}>
            <Box
               padding="10px"
               border="1px solid #ccc"
               borderRadius="8px"
               textAlign="center"
               backgroundColor="white"
               sx={{
                 transition: "transform 0.3s, box-shadow 0.3s",
                 "&:hover": {
                   transform: "scale(1.05)", // Slightly scale up on hover
                   boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)", // Add shadow on hover
                   borderColor: "#aaa" // Optional: Change border color on hover
                 }
               }}
            >
              <CardMedia component="img" image={pokemon.image} alt={pokemon.name} />
              <Typography variant='h6'
              sx={{
                textAlign: "left",
                marginLeft: "10px",
                color: "grey",
                fontSize: {
                  xs: "16px",
                  sm: "20px",
                  lg: "22px"
                }
              }}>
                #{pokemon.id}
              </Typography>
              <Typography variant="h6" 
              sx={{
                fontWeight: "bold",
                fontSize: {
                  xs: "1rem",
                  sm: "1.5rem",
                  lg: "2rem"
                }
              }}>
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </Typography>
              <hr />
              <Typography variant="subtitle1" 
              sx={{
                fontSize: {
                  lg: "20px"
                }
              }}>
   {pokemon.types.map(type => type.charAt(0).toUpperCase() + type.slice(1)).join(" / ")}
</Typography>

            </Box>
            
            </Link>
            
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" marginTop="20px">
        <Button variant="contained" color="primary" onClick={fetchPoke} disabled={fetching}>
          {fetching ? "Loading..." : "Show More"}
        </Button>
      </Box>
    </Box>
  );
}
