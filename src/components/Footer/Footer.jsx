import { Box, CardMedia, Typography } from "@mui/material";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';


export default function Footer() {
  return (
    <Box width="80%" margin="auto" marginBottom="1rem" padding="0" backgroundColor="black" paddingBlock="1rem" display="flex" justifyContent="space-evenly">
      <Box display="flex" alignContent="center">
      <Typography
      sx={{
        color: "grey",
        marginRight: "10px",
        alignContent: "center",
        fontSize: {
          xs: "14px",
          sm: "20px",
          md: "25px",
          lg: "35px"
        }
      }}>
        2024
      </Typography>
      <Typography
      sx={{
        color: "white",
        fontSize: {
          xs: "18px",
          sm: "22px",
          md: "40px",
          lg: "60px"
        }
      }}>
        Pokédex
      </Typography>
      </Box>

      <CardMedia
      component="img"
      image="/footerImage/footerImage.png"
      alt="Footer Image"
      sx= {{
        alignItems: "center",
        justifyContent: "center",
        width: {
          xs: "50px",
          sm: "70px",
          md: "100px",
          lg: "120px"
        }
      }}
      />
      <Box alignContent="center">
      <FacebookOutlinedIcon 
        sx={{
          color: "white",
          fontSize: {
            xs: "25px",
            sm: "30px",
            md: "45px",
            lg: "55px"
          },
          cursor: "pointer",
          "&:hover": {
            color: "#eeee"
          }
        }}
      />

<TwitterIcon
        sx={{
          color: "white",
          marginLeft: "5px",
          fontSize: {
            xs: "25px",
            sm: "30px",
            md: "45px",
            lg: "55px"
          },
          cursor: "pointer",
          "&:hover": {
            color: "#eeee"
          }
        }}
      />

<LinkedInIcon
        sx={{
          color: "white",
          marginLeft: "5px",
          fontSize: {
            xs: "25px",
            sm: "30px",
            md: "45px",
            lg: "55px"
          },
          cursor: "pointer",
          "&:hover": {
            color: "#eeee"
          }
        }}
      />

<InstagramIcon
        sx={{
          color: "white",
          marginLeft: "5px",
          fontSize: {
            xs: "25px",
            sm: "30px",
            md: "45px",
            lg: "55px"
          },
          cursor: "pointer",
          "&:hover": {
            color: "#eeee"
          }
        }}
      />
      
      </Box>
      
    </Box>
  )
}
