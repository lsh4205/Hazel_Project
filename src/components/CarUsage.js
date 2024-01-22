import React, {useEffect} from 'react';
import {Box, ToggleButton, ToggleButtonGroup, Typography} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import carbonData from '../carbonemissions.json'
import { styled } from '@mui/material/styles';
import "./CarUsage.css";

// Reference for Button Group 

// https://stackoverflow.com/questions/64073392/materialui-buttongroup-active
export default function CarUsage({data, onChange}) {
   // const [value, setValue] = React.useState('1');
    var carbonTotal = '';
    const CustomToggleG = styled(ToggleButtonGroup)(({ theme }) => ({
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 5,
        paddingTop: 5,
        '& .MuiToggleButtonGroup-grouped': {
            borderRadius: theme.spacing(2.5),
            backgroundColor: '#EEF6DA'
        },
        '& .MuiToggleButton-standard': {
            color: 'grey',
            fontWeight: 600
        }, 
        '& .MuiToggleButton-standard:hover':{
            borderColor: '#99c2a370 !important',
            backgroundColor: '#99c2a370',
            fontWeight: 600,
        }
    }));

    const ToggleButtonStyle = styled(ToggleButton)(({ theme }) => ({
        px: 0,
        cursor: 'pointer',
        // outlineColor: theme.palette.grey[100],
        // outlineWidth: '1px',
        // outlineStyle: 'solid',
        border: '0px solid !important',
        borderRadius: '10px !important',
        width: 'flex',
        height: 30,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 2,
        marginBottom: 2,
        fontFamily: 'Tahoma',
        fontSize: 12,
        "&.Mui-selected, &.Mui-selected:hover": {
            color: 'white !important',
            backgroundColor: '#99C2A3 !important',
            borderColor: '#99C2A3 !important',
            fontWeight: 600,
            boxShadow: 3
        }
    }));

    const [carType, setCarType] = React.useState('list');
    const [drivingHours, setDrivingHours] = React.useState('list');
    const [transportationType, setTransportationType] = React.useState('list');
    
    useEffect(()=> {
        setCarType(data?.data?.carType)
        setDrivingHours(data?.data?.drivingHours)
        setTransportationType(data?.data?.transportationType)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=> {
        onChange(
            {
                data: {
                    carType: carType,
                    drivingHours: drivingHours,
                    transportationType: transportationType
                },
                total: getCarbonEmissions()
            }   
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [carType, drivingHours, transportationType])

    const carTypeChange = (event, nextView) => {
        setCarType(nextView);
    };
    const drivingHChange = (event, nextView) => {
        setDrivingHours(nextView);
    };
    const transportationTypeChange = (event, nextView) => {
        setTransportationType(nextView);
    };
    // Reference
    // https://climate.mit.edu/ask-mit/are-electric-vehicles-definitely-better-climate-gas-powered-cars#:~:text=The%20researchers%20found%20that%2C%20on,vehicle%20created%20just%20200%20grams.
    const getCarbonEmissions = () => {
        let carTypeC02 = carbonData['car']['carType'][carType];
        let drivingHoursC02 =  carbonData['car']['drivingHours'][drivingHours];
        let transportationT = carbonData['car']['transportationType'][transportationType];
        carbonTotal = 11435 - (carTypeC02 * drivingHoursC02 + (1-drivingHoursC02) * transportationT);
        
        return carbonTotal ? carbonTotal : 0
    }
    // const displayCarbonEmissions = () => {

    // }
    // According to the American Public Transportation Association's (APTA) 2021 Public Transportation Fact Book,
    // in 2019, the average annual miles traveled by rail transit riders
    // in the United States was 1,197 miles per person.
    // The average carbon dioxide emissions from passenger rail travel in the United States is about 0.17 pounds of CO2 per passenger mile. 
    
    // the average carbon dioxide emissions from passenger buses in the United States is about 0.41 pounds of CO2 per passenger mile. 
    // According to the American Public Transportation Association's (APTA) 2021 Public Transportation Fact Book, in 2019,
    // the average annual passenger miles traveled by bus transit riders in the United States was 2,556 miles per person.
    return (
        <div>
            <Typography 
                sx={{
                    fontFamily: 'Inter',
                    fontWeight: 'bold',
                    fontSize: 24,
                    marginBottom: 1
                    }}>
                    Measure Your Impact 
            </Typography>
            <Box sx={{fontFamily: 'Inter', fontSize: 14}} className="inputQuestion">
                Ideally, what type of car would you drive?
                <br/>
                <CustomToggleG
                    className='options'
                    orientation="horizontal"
                    value={carType}
                    exclusive
                    onChange={carTypeChange}
                >
                    <ToggleButtonStyle value="EV">
                        Electric Car
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="Hybrid">
                        Hybrid Car
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="Gas">
                        Gas Car
                    </ToggleButtonStyle>
                </CustomToggleG>
                
                <br/>
                How much less do you want to drive to reduce carbon emissions? 
                <br/>
                <CustomToggleG
                    className='options'
                    orientation="horizontal"
                    value={drivingHours}
                    exclusive
                    onChange={drivingHChange}
                > 
                    <ToggleButtonStyle value="0Less">
                        Maintain driving
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="25Less">
                        50% Less
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="50Less">
                        75% Less
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="75Less">
                        100% Less
                    </ToggleButtonStyle>
                </CustomToggleG>
                <br/>
                Instead of driving, if you were to take public transportation to reduce carbon emissions, what would you take? 
                <br/>
                <CustomToggleG
                    className='lastOptions'
                    orientation="horizontal"
                    value={transportationType}
                    exclusive
                    onChange={transportationTypeChange}
                >
                    <ToggleButtonStyle value="Bus">
                        Bus
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="Train">
                        Train / Subway
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="SharedCar">
                        Shared Car
                    </ToggleButtonStyle>
                </CustomToggleG>

                <div>
                    <Typography 
                        sx={{
                            fontFamily: 'Inter',
                            fontWeight: 'bold',
                            fontSize: 22, mr:1
                            }} display="inline">
                            Car Carbon Emissions Saved:
                    </Typography>
                    <Typography 
                        sx={{
                            fontFamily: 'Inter',
                            fontWeight: 'bold',
                            fontSize: 22, color: 'green'
                            }}  display="inline">
                            {getCarbonEmissions().toFixed() + " lb"}
                    </Typography>
                </div>
                
                {/* Data source and icon */}
                <Typography 
                    sx={{
                        fontFamily: 'Inter',
                        fontWeight: 'light',
                        fontSize: 12,
                        color: 'grey',
                        display: "flex", 
                        alignItems: "center",
                    }} nowrap>
                        <HelpIcon sx={{ fontSize: 18, mr: 1 }} /> 
                        Data from the U.S. Environmental Protection Agency (EPA), 
                        American Public Transportation Association's (APTA), and
                        MIT Climate Portal.
                </Typography>
            </Box>
            {/* <Box sx={{fontFamily: 'Arial'}} className="inputQuestion">
                If you were to try to take public transportation to reduce carbon emissions, what would you take? 
                <Button className="userInput" value="EV" onClick={onClick}>Bus </Button>
                <Button className="userInput" value="Hybrid" onClick={onClick}>Train / Subway</Button>
                <Button className="userInput" value="Gas" onClick={onClick}> Light Rail </Button>
                <Button className="userInput" value="Gas" onClick={onClick}> Streetcar / Trolley </Button>
            </Box> */}

        </div>
    );
}