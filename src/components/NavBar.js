
import { AppBar, Typography, Toolbar} from '@mui/material';

// Images 
import logo from '../images/icons/icon.png'


// const drawerWidth = 200;

function NavBar() {
  
  
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} color='primary'>
      <Toolbar>
        <img src={logo} style={{width: "50px"}}></img>
        <Typography variant="h6"  style={{padding: "10px"}} color="white">
            Hazelverse
        </Typography>
        </Toolbar>
      </AppBar>

    
  );
}

export default NavBar;
