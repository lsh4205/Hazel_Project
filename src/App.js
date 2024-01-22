import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPanel from './components/MainPanel';
import LandingPage from './components/LandingPage';
import History from './components/History';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from './components/NavBar';
import Suggestions from './components/Suggestions';
// Images 
// import logo from './images/icons/icon.png'
// import car from './images/icons/car.png'
// import plastic from './images/icons/plastic.png'
// import diet from './images/icons/dish.png'
// import donation from './images/icons/donation.png'

// const drawerWidth = 200;

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#99C2A3'
      },
      secondary : {
        main: '#C7D5A6'
      },
      hazelGrey : {
        main: '#515F68'
      }
    },
    typography: {
      fontFamily: 'Quickens',
    },
  });
  
  return (
    <ThemeProvider theme = {theme}>
    <NavBar/>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<LandingPage/>}></Route>
        <Route path = "/app" element = {<MainPanel/>} />
        <Route path = "/app/community" element = {<History/>}/>
        <Route path = "/app/suggestions/:amount" element = {<Suggestions/>}/>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>

  );
}

export default App;
