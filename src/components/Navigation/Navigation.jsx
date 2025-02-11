import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();

  return (
    <Box width="80%" margin="auto" padding="0" backgroundColor="#eeee" display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" justifyContent="right" alignContent="center">
        <Button variant="contained" onClick={() => navigate("/")} sx={{ margin: "5rem" }}>Home</Button>
        <Button variant="contained" onClick={() => navigate("/favorites")} sx={{ margin: "1rem" }}>Favorites</Button>
      </Box>
        <Button variant="contained" onClick={() => navigate("/licence")} sx={{ margin: "1rem" }}>Licence</Button>
    </Box>
  );
}
