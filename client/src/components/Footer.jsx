import { Box, Typography, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        padding: 0,
        backgroundColor: 'transparent',
        color: 'white',
        textAlign: 'center',
        width: '100vw',
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <IconButton
        component="a"
        href="https://github.com/CarlosLavayenJr/GoodGameOrg"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ color: 'white', '&:hover': { color: '#007bff' } }}
      >
        <GitHubIcon />
      </IconButton>
      <Typography variant="body2">
        Made with ❤️️ &copy; 2024 Copy Pasta Purists
      </Typography>
    </Box>
  );
}

export default Footer;
