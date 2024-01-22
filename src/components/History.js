import React from 'react';
import {Typography, Box} from '@mui/material'
import useWindowDimensions from './WindowDimsHook';
import Tree1 from '../images/icons/pine.png';
import Tree2 from '../images/icons/tree.png';
import Forest from '../images/icons/forest.png';
import { useNavigate } from "react-router-dom";
import { Avatar, Slider, Container, Stack, Card, CardContent, CardMedia} from '@mui/material';
import p1_pic from '../images/forest1.jpeg';
import p1_pic2 from '../images/forest2.jpeg';
import p1_pic3 from '../images/forest3.jpeg';

import Button from "react-bootstrap/Button";

export default function History(){
    const [result, setResult] = React.useState([]);
    const [sliderPos, setSliderPos] = React.useState(0);
    
    React.useEffect(() => {
        fetch("http://127.0.0.1:3001/carbonTotals", {method: "GET"}).then((data) => {
            return data.json()
        }).then((totals)=> {
            setResult(totals.data)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    var carbonTotals = 0
    let getAmount = () => {
        let indexTo = Math.floor(result.length * (sliderPos/100))
        let carbonTotal = 0
        for (let i = 0; i<indexTo; i++){
            carbonTotal += result[i]["tonnes"]
        }
        // Convert tonnes of Carbon into Trees
        carbonTotal *= 36.5
        // When page is initialized
        if (indexTo === 0) {
            return "Dec, 2020 Trees Saved: ".concat(carbonTotal.toFixed(0))
        }
        let month = (result[indexTo - 1]["month"]).slice(0, 8)
        carbonTotals = carbonTotal
        return month + " Trees Saved: " + (carbonTotal.toFixed(0))
    }

    // let getText = () => {        
    //     return <h1 style={{color:'grey', fontFamily: 'Quickens'}}>Current Projects</h1>
    // }
    
    const height = useWindowDimensions()[0];
    console.log(carbonTotals)

    const t1 = 600;
    const t2 = t1 * 2;
    const t3 = t1 * 3;
    const t4 = t1 * 4;
    const m = 0.3;
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = -1; 
        navigate(path);
    }
    const borderR = '16px';

    const Project_panel = ({pic, title, subs}) => {
        return (
            <Card sx={{ display: 'flex',backgroundColor: '#FCFFF4',
                    borderRadius: borderR, height: '150px',
                    boxShadow: 3, mr: '20px', mb:'20px'
                }}>
                <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        image= {pic}
                        alt="Live from space album cover"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            {title}
                        </Typography>
                        <Typography sx={{fontFamily: 'Inter'}} variant="subtitle2" color="grey" component="div">
                            {subs[0]} 
                        </Typography>
                        <Typography sx={{fontFamily: 'Inter'}} variant="subtitle2" color="grey" component="div">
                            {subs[1]}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        );
    }
    return (
        <Container sx={{ height:'100vh', paddingTop:'20px'}}>
            <div className = "side-to-side-div" style={{width: '100%'}}>
                <Box>
                    <Typography variant="h4"  style={{padding: "10px"}} color="hazelGrey">
                    Projects
                    </Typography>
                    <Project_panel pic={p1_pic} title={'Conservation: Southern Cardamom'} 
                        subs={['1.2M acres of forest in Cambodia','biodiversity hotspot, as determined by the United Nations']}/>
                    <Project_panel pic={p1_pic2} title={'Forestry: Ranchland Forest Planting'} 
                        subs={['52,000 acres of forest in Uruguay', 
                        'aforrestation project that estimates 7 million+ tons of carbon removal and bring other community benefits']}/>
                    <Project_panel pic={p1_pic3} title={'Forestry: Kenya Forest Planting'}
                        subs={['3,700+ local villages involved in planting new forests in Kenya',
                        'reforestation project to reduce erosion, improve soil quality, and remove carbon']}/>
                    <Button className='centered-nav-button'
                        style={{cursor:'pointer'}}
                        onClick={routeChange}
                        {...{children: "Back"}}
                        >
                    </Button>
                </Box>

                <Box style={{paddingLeft: '40px'}}>
                    <Typography variant="h4"  style={{padding: "10px"}} color="hazelGrey">
                        Hazel Community Saves...
                    </Typography>
                    <Typography variant="caption"  style={{padding: "10px"}} color="hazelGrey">
                        From December, 2020, Hazel Community contributes to climate change positively. Here is how we save the Earth!
                    </Typography>
                    <Container
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{boxShadow: 3}}
                        style={{height: "70%",width:"100%", backgroundColor:"#FCFFF4", margin: "10px", borderRadius: "10px"}}
                    >
                        <Box display="flex"
                            justifyContent="center"
                            alignItems="center"
                            style={{height: "5%", margin: "10px", borderRadius: "10px", paddingBottom:'20%'}}
                        >
                            <h1 className = "common-text">{getAmount()}</h1>

                        </Box>

                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            minHeight={height / 2}
                            style={{width: '100%'}}
                        >
                            <Avatar alt="tree" src={Tree1} 
                                sx={{width : carbonTotals < t1 ? m * carbonTotals : t1 * m,
                                height: carbonTotals < t1 ? m * carbonTotals : t1 * m}}></Avatar>
                            <Avatar alt="tree" src={Forest} 
                                sx={{width : carbonTotals > t1 && carbonTotals < t2 ? m * (carbonTotals-t1)
                                    : carbonTotals < t2 ? 0 
                                    : carbonTotals > t2 ? t1 * m : m * (carbonTotals - t1),
                                    height: carbonTotals > t1 && carbonTotals < t2 ? m * (carbonTotals-t1)
                                    : carbonTotals < t2 ? 0 
                                    : carbonTotals > t2 ? t1 * m : m * (carbonTotals - t1)}}></Avatar>
                            <Avatar alt="tree" src={Tree2} 
                                sx={{width : carbonTotals > t2 && carbonTotals < t3 ? m * (carbonTotals-t2)
                                    : carbonTotals < t3 ? 0 
                                    : carbonTotals > t3 ? t1 * m : m * (carbonTotals - t2),
                                    height: carbonTotals > t2 && carbonTotals < t3 ? m * (carbonTotals-t2)
                                    : carbonTotals < t3 ? 0 
                                    : carbonTotals > t3 ? t1 * m : m * (carbonTotals - t2)}}></Avatar>
                        </Box>
                    </Container>
                    
                    <Container>
                        <Stack direction="row" spacing={2}>
                            <Typography color="black">December 2020</Typography>
                            <Slider value={sliderPos} onChange={(e, v)=> setSliderPos(v)} color='secondary'></Slider>
                            <Typography color="black">Present</Typography>
                            </Stack>
                    </Container>
                </Box>

            </div>
         </Container>
 
    )
}