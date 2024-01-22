import React, {useEffect, useState} from 'react';
import {Container, Box, Grid, Paper, useTheme} from '@mui/material';
import {Typography, Slider, Stack} from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';
import '../App.css';
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import BackArrow from '@mui/icons-material/ArrowBack';

import carImage from "../images/vector/car_vector.svg"
import airplaneImage from "../images/vector/airplane_vector.svg"
import flowersImage from "../images/vector/flowers_vector.svg"
import natureImage from "../images/vector/nature.svg"
import sunImage from "../images/vector/sun.svg"

export default function Suggestions() {
    const [sliderPos, setSliderPos] = React.useState(50);
    let {amount} = useParams()
    let theme = useTheme()

  
    const [blockData, setBlockData] = useState([
        { val:0 },
        { val:0 },
        { val:0 },
        { val:0 },
    ]);
    const navigate = useNavigate(); 
    let location = useLocation();

    const routeChange = () =>{ 
    let path = `/app`; 
    navigate(path);
    }
    const blockStrings = [
        "Reduce Flight Miles by: x",
        "Reduce Car Miles by: x",
        "Go Vegan for: x years",
        "Install x Solar-powered KW"
    ]

    const blockImages = [
        airplaneImage,
        carImage,
        natureImage,
        sunImage
    ]

    useEffect(()=> {
        setBlockData((curr) => {
            let newVal = calcRecs()
            let newArr = [];
            newVal.forEach((data, i)=>{newArr[i] = {val: data}});
            return newArr;
        })
    }, [sliderPos])
    useEffect(  ()=> {
        console.log(blockData)
    }, [blockData])

    const calcRecs = () => {
        let targetCarbon = amount * ((100 - sliderPos) / 100)
        let flightMiles = (targetCarbon / 0.4).toFixed(0) // 0.4 lb per passenger flight mile
        let carMiles = (targetCarbon / 0.9061).toFixed(0) // 411 g / .9061 lb per car passenger vehicle mile
        let veganYears = (targetCarbon / 771.617).toFixed(0) // 50 kg / 110.231 lb per 1 vegan day per week for a year -> * 7 for fully vegan
        let solarPoweredKilowatts = (targetCarbon / 3000).toFixed() // 3k lbs per solar powered kilowatt installed
        return [parseInt(flightMiles), parseInt(carMiles), parseInt(veganYears), parseInt(solarPoweredKilowatts)]
    }

    const calcDono = () => {
        let targetCarbon = amount * (sliderPos / 100)
        return ((targetCarbon / 2204.62) * 30).toFixed(0) // Number of tons * $30 per ton
    }
    return  <Grid  style={{height: '100vh', margin: '90px 0 0 20px'}}>
        <Grid item ><Stack direction="row">
            <IconButton  
                onClick= {routeChange}
                size="large"
                
                >
                    <BackArrow fontSize='large'></BackArrow>
        </IconButton><div><Typography variant="h3" color="hazelGrey">
                    You saved {amount} lbs of carbon through your actions!
                </Typography><Typography color="hazelGrey">
                    You can also save that amount by doing a combination of the two...
                </Typography></div></Stack>
        </Grid>
        <Grid direction="row" container style={{height: '80%', margin: '30px 0 0 20px'}}>
            <Grid item style={{width: "48%"}}> 
            <Container sx={{
                    backgroundColor: '#FCFFF4',
                    borderRadius: '16px',
                    boxShadow: 3,
                    height: '95%',
                    width: "90%",
            }}>
                <>
                <Typography variant="h4"  style={{padding: "10px"}} color="hazelGrey">
                    Recommendations
                </Typography>
                <Typography variant="caption"  style={{padding: "10px"}} color="hazelGrey">
                    Here are possibilities on how you can improve...
                </Typography>
               
                    {/* <div className="suggestions-text-div">
                        <span className="common-text">Reduce Flight Miles by : {calcRecs()[0]} Miles</span>
                        <span className = "OR-text"> OR </span>
                        <span className="common-text">Reduce Car Miles by : {calcRecs()[1]} Miles</span>
                        <span className = "OR-text"> OR </span>
                        <span className="common-text">Go Vegan for : {calcRecs()[2]} Years</span>
                        <span className = "OR-text"> OR </span>
                        <span className="common-text">Install {calcRecs()[3]} Solar-Powered Kilowatts</span>
                    </div> */}
            
                 <Box style={{height: "75%", backgroundColor:"#C7D5A6", margin:"20px", borderRadius: "10px", padding: '5px'}}
                    sx={{
                        display: 'grid',
                        gap: 3,
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        justifyItems:'center',
                    }}
                    >
                    {blockData.map((data, index) => (
                        <Paper key={index} style={{
                            textAlign: 'center',
                            color: theme.palette.text.secondary,
                            width: "80%", height: "80%",
                            padding:"5px",
                            marginTop:"5px"
                        }}>
                            <img height={"50%"} width= {"50%"} src ={blockImages[index]}></img>
                            <Typography>{blockStrings[index].replace("x",  data.val)}</Typography>
                        </Paper>
                    
                    ))}
                </Box>
                </>
            </Container>
            </Grid>
            <Grid item style={{width: "2%", verticalAlign: "middle"}}> <Typography variant="h5" style={{marginTop:"35vh"}}>{"and"}</Typography></Grid>
            <Grid item style={{width: "48%"}}> 
            <Container sx={{
                    backgroundColor: '#FCFFF4',
                    borderRadius: '16px',
                    boxShadow: 3,
                    height: '95%',
                    width: "90%"
            }}>
                <>
                <Typography variant="h4"  style={{padding: "10px"}} color="hazelGrey">
                    Donations
                </Typography>
                <Typography variant="caption"  style={{padding: "10px"}} color="hazelGrey">
                    Donate a certain amount...
                </Typography>
                <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{height: "75%", backgroundColor:"#C7D5A6", margin: "20px", borderRadius: "10px"}}
                >
                <span className="common-text">Donate to a Hazelverse Project : ${calcDono()}</span>
                </Box>
                
                </>
            </Container>
        
            </Grid>
        </Grid>
        <Grid>
        <Container sx={{
            backgroundColor: '#FCFFF4',
            borderRadius: '16px',
            boxShadow: 3,
      }}>
        <Stack direction="row" spacing={2}>
        <Typography color="black">More Recommendations</Typography>
        <Slider value={sliderPos} 
                onChange={(e, v)=> setSliderPos(v)} 
                color='secondary'
                >
        </Slider>
        <Typography color="black">More Donations</Typography>
        </Stack>
         </Container>

        </Grid>
    
   
  </Grid>
}
