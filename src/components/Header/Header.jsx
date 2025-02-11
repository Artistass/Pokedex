import { CardMedia, Box, Typography } from '@mui/material';

export default function Header() {
  return (
    <Box width="80%" margin="auto" marginTop="1rem" padding="0" position="relative">
      <CardMedia
        component="img"
        image="/headerImage/Header_Image.png"
        alt="Header Image"
        sx={{
          width: "100%",
          height: {
            xs: "100px",
            sm: "150px",
            md: "200px",
            lg: "300px",
          },
          filter: "grayscale(.3)"
        }}
      />
      <Typography
        variant="h1"
        sx={{
          position: "absolute",
          top: "50%",                
          left: "50%",               
          transform: "translate(-50%, -50%)", 
          color: "white",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5), 4px 4px 8px rgba(0, 0, 0, 0.3)",
          padding: "0.5rem",         
          textAlign: "center",
          letterSpacing: {
            xs: ".3rem",
            sm: ".6rem",
            md: "1rem",
            lg: "1.5rem"
          },
          fontSize: {
            xs: "50px",
            sm: "65px",
            md: "90px",
            lg: "100px"
          }
        }}
      >
        Pokédex
      </Typography>
    </Box>
  );
}
