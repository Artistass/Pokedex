import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = 'https://pokeapi.co/api/v2';

export default function SearchBar() {
  const [name, setName] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      setIsEmpty(true); // Set the error state for empty input
      return; // Exit the function if the input is empty
    }

    const isIdSearch = !isNaN(name) && name.trim() !== "";
    const searchUrl = isIdSearch ? `${API_URL}/pokemon/${name}` : `${API_URL}/pokemon/${name.toLowerCase()}`;

    try {
      const response = await axios.get(searchUrl);
      setIsSuccess(true);
      navigate(`/pokemon/${response.data.id}`); // Redirect to Pokemon detail page
    } catch (error) {
      setIsError(true);
    }
  }

  // Reset isError after a timeout
  useEffect(() => {
    if (isError) {
      setTimeout(() => setIsError(false), 2000);
    }
  }, [isError]);

  // Reset isSuccess after a timeout
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => setIsSuccess(false), 2000);
    }
  }, [isSuccess]);

  // Reset isEmpty after a timeout
  useEffect(() => {
    if (isEmpty) {
      setTimeout(() => setIsEmpty(false), 2000);
    }
  }, [isEmpty]);

  return (
    <Box width={"60%"} margin={"auto"}
    sx={{
      width: {
        xs: "100%",
        sm: "90%",
        md: "80%",
        lg: "60%"
      }
    }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: {
            xs: "20px",
            lg: "30px"
          },
        }}
      >
        Name or Number
      </Typography>
  
      <Box 
        component="form"   // Ensure this Box acts as a form
        onSubmit={handleSubmit}  // Handle submit on this form container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: {
            xs: "column",  // Stack vertically on small screens
            sm: "column",
            md: "row"      // Align horizontally on medium and larger screens
          },
          padding: "1rem 0",
          width: "100%",    // Full width of parent container
          gap: "1rem"       // Adds space between the items in the flex container
        }}
      >
        <Box 
          sx={{
            display: "flex",
            alignItems: "center",
            width: {
              xs: "100%",    // Full width on small screens
              md: "60%"      // 60% of container on medium and larger screens
            }
          }}
        >
          <TextField 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            size="small" 
            id="outlined-basic" 
            label="Name or Number" 
            variant="outlined" 
            autoComplete="off"
          />
          <Button 
            type="submit" 
            variant="outlined"
            sx={{
              marginLeft: "1rem",
              width: "auto"
            }}
          >
            SEARCH
          </Button>
        </Box>

        <Typography
          sx={{
            fontSize: {
              xs: "16px",
              md: "20px"
            },
            padding: "10px",
            fontWeight: "bold",
            width: {
              xs: "100%",  // Full width on small screens
              md: "40%"    // 40% of container on medium and larger screens
            },
            textAlign: "center" // Center text for better readability
          }}
        >
          Search for a Pokémon by name or using its National Pokédex number.
        </Typography>
      </Box>

      {isError && (
        <Alert severity="error" sx={{ width: "50%", margin: "auto" }}>
          Pokémon not found!
        </Alert>
      )}
  
      {isEmpty && (
        <Alert severity="error" sx={{ width: "50%", margin: "auto" }}>
          Search bar is empty!
        </Alert>
      )}
    </Box>
  );
}
