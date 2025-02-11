import { Box, Typography } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

export default function NotFound() {
  return (
    <Box width="80%" margin="auto" padding="20px" backgroundColor="#eeee" textAlign="center">
      <Typography variant='h1'>
        404
      </Typography>
      <Typography variant='h5'>
        Page not found
      </Typography>
      <SentimentVeryDissatisfiedIcon fontSize="large" color="error" />
    </Box>
  );
}
