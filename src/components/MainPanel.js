import React, { useEffect } from 'react';
import {Container, Box, Tab, Grid, Typography} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import History from './History';
import AirTravel from './AirTravel';
import CarUsage from './CarUsage';
import Electricity from './Electricity';
import Housing from './Housing';
import Project from './Project';
// import { createTheme } from '@mui/material/styles';
import Button from "react-bootstrap/Button";
import VisualPanel from './VisualPanel';
import Lifestyle from './Lifestyle';
import { useNavigate, useLocation } from "react-router-dom";
import '../App.css';

// import "./Styles.css";

const borderR = '16px';
// const theme = createTheme({
//     palette: {
//       primary: {
//         main: '#99C2A3'
//       },
//       secondary : {
//         main: '#C7D5A6'
//       },
//       hazelGrey : {
//         main: '#515F68'
//       }
//     },
//     typography: {
//       fontFamily: 'Quickens',
//     },
//   });

  
export default function LabTabs() {
    const [value, setValue] = React.useState('1');
    const [data, setData] = React.useState({air: {total: 0}, car: {total: 0}, electricity: {total: 0}, housing: {total: 0}, lifestyle: {total: 0}})
    
    let navigate = useNavigate(); 
    let location = useLocation()

    const routeChange = () =>{ 
    let path = `community`; 
    navigate(path);
}
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const checkAllTabsFilled = () => {
      // Helper function to disable the Suggestions button when not all fields are filled.
      for (let i = 0; i < Object.keys(data).length; i++) {
        if (data[Object.keys(data)[i]]?.total === 0) {
          return 1
        }
      }
      return 0
    }

    const getCarbonEmissions = () => {
      let carbonTotal = 0;

      for (let i = 0; i<Object.keys(data).length; i++){
        carbonTotal += data[Object.keys(data)[i]]?.total
      }
      // console.log(carbonTotal);
      return carbonTotal ? carbonTotal.toFixed(0): " 0 "
    }

    // useEffect(()=> {
    //   if(location.state != null) {
    //     // console.log(location.state)
    //     setData(location.state)
    //     setValue("1")
    //   }
    // }, [])

    
    return (
      <div>
        <VisualPanel style={{zIndex: 0 }} carbonEmissions={getCarbonEmissions()}/>

        <Grid direction="row"container style={{height: '100vh', margin: '90px 0 0 20px'}}>
          <Grid item style={{width: "530px", zIndex:2}}>
          <span className="common-text">Fill out all of the tabs to see Suggestions!</span>
 
            <Container sx={{
                  backgroundColor: '#FCFFF4',
                  borderRadius: borderR,
                  boxShadow: 3
            }}>
              <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleChange} aria-label="lab API tabs example">
                          <Tab label="Air Travel" value="1" />
                          <Tab label="Car Usage" value="2" />
                          <Tab label="Electricity" value="3" />
                          <Tab label="Housing" value="4" />
                          <Tab label="Lifestlye" value="5" />
                          <Tab label="Projects" value="6" />
                      </TabList>
                  </Box>
                  <TabPanel value="1" sx={{margin: '-12px'}}> 
                    <AirTravel data={data?.air} onChange={(val)=> {
                      setData((curr)=> ({
                          ...curr,
                          air: val
                      }))
                    }}/>
                </TabPanel>
                <TabPanel value="2" sx={{margin: '-12px'}}>
                    <CarUsage data={data?.car} onChange={(val)=> {
                      setData((curr)=> ({
                        ...curr,
                        car: val
                    }))
                    }}/>
                </TabPanel>
                <TabPanel value="3" sx={{margin: '-12px'}}>
                    <Electricity  data={data?.electricity} onChange={(val)=> {
                      setData((curr)=> ({
                        ...curr,
                        electricity: val
                    }))
                    }}/>
                </TabPanel>
                <TabPanel value="4" sx={{margin: '-12px'}}> 
                    <Housing  data={data?.housing} onChange={(val)=> {
                      setData((curr)=> ({
                        ...curr,
                        housing: val
                    }))
                    }}/>
                </TabPanel>
                <TabPanel value="5" sx={{margin: '-12px'}}>
                    <Lifestyle  data={data?.lifestyle} onChange={(val)=> {
                      setData((curr)=> ({
                        ...curr,
                        lifestyle: val
                    }))
                    }}/>
                </TabPanel>
                <TabPanel value="6"> 
                    <Project/>
                </TabPanel>
                <div style={{ paddingTop:'10px',paddingBottom: '20px'}}>
                  <Typography 
                    sx={{
                        fontFamily: 'Inter',
                        fontWeight: 'bold',
                        fontSize: 22, ml:'10px'
                        }} display="inline">
                        Total Carbon Emissions Saved:  
                  </Typography>
                  <Typography 
                    sx={{
                        fontFamily: 'Inter',
                        fontWeight: 'bold',
                        fontSize: 22, color: 'green'
                        }}  display="inline">
                        {" " + getCarbonEmissions() + " lb"}
                    </Typography>
                </div>
                
              </TabContext>
            </Container>
            <Container>
              <Button className="centered-nav-button" 
                style={{cursor:'pointer'}} 
                onClick= {routeChange}
                {...{children: "Community"}}
              >
              </Button>
              <Button className="centered-nav-button" 
                style={{cursor:'pointer'}} 
                disabled={checkAllTabsFilled()}
                onClick= {() => navigate(`suggestions/${getCarbonEmissions()}`, {state:data})}
                {...{children: "Suggestions"}}
              >
              </Button>
          </Container>
          </Grid>

          <Grid item xs style={{margin: '0 40px 0 20px'}}>
          </Grid>
        </Grid>
      </div>
    );
}