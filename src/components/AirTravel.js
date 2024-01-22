import React, {useEffect} from 'react';
import {Box, ToggleButton, ToggleButtonGroup, Typography} from '@mui/material';
import carbonData from '../carbonemissions.json';
import HelpIcon from '@mui/icons-material/Help';
import { styled } from '@mui/material/styles';
import "./AirTravel.css";

export default function AirTravel({data, onChange}) {
    // const [value, setValue] = React.useState('1');

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

    //Questions
    const [flightFrequency, setFlightFrequency] = React.useState('list');
    const [flightClass, setFlightClass] = React.useState('list');
    const [flightStops, setFlightStops] = React.useState('list')

    //Inputs
    useEffect(()=> {
        setFlightFrequency(data?.data?.flightFrequency)
        setFlightClass(data?.data?.flightClass)
        setFlightStops(data?.data?.flightStops)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=> {
        onChange(
            {
                data: {
                    flightFrequency: flightFrequency,
                    flightClass: flightClass,
                    flightStops: flightStops
                },
                total: getCarbonEmissions()
            }   
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flightFrequency, flightClass, flightStops])

    const changeFlightFrequency = (event, nextView) => {
        setFlightFrequency(nextView);
    };
    const changeFlightClass = (event, nextView) => {   
        setFlightClass(nextView);
    };
    const changeFlightStops = (event, nextView) => {
        setFlightStops(nextView);
    }; 

    const getCarbonEmissions = () => {
        let carbonTotal = 3434 - (carbonData['air']['flightFrequency'][flightFrequency] *
        carbonData['air']['flightClass'][flightClass] +
        carbonData['air']['flightStops'][flightStops])
       
        return carbonTotal ? carbonTotal: 0
    }

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
                What is the maximum amount you would be willing to reduce your flight frequency by?
                <br/>
                <CustomToggleG
                    className='options'
                    orientation="horizontal"
                    value={flightFrequency}
                    exclusive
                    onChange={changeFlightFrequency}
                >
                    <ToggleButtonStyle value="0Less">
                        Not at all
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="25Less">
                        25% less
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="50Less">
                        50% less
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="75Less">
                        75% less
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="100Less">
                        100% less
                    </ToggleButtonStyle>
                </CustomToggleG>
                <br/>

                What class would you fly in?
                <br/>
                <CustomToggleG
                    className='options'
                    orientation="horizontal"
                    value={flightClass}
                    exclusive
                    onChange={changeFlightClass}
                >
                    <ToggleButtonStyle value="economy">
                        Economy
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="business">
                        Business
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="firstClass">
                        First Class
                    </ToggleButtonStyle>
                </CustomToggleG>
                <br/>

                How many stops would you take when you fly?
                <br/>
                <CustomToggleG
                    className='lastOptions'
                    orientation="horizontal"
                    value={flightStops}
                    exclusive
                    onChange={changeFlightStops}
                >
                    <ToggleButtonStyle value="0Stops">
                        0 stops
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="1-2Stops">
                        1-2 stops
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="2+Stops">
                        2+ stops
                    </ToggleButtonStyle>
                </CustomToggleG>
                <div>
                    <Typography 
                        sx={{
                            fontFamily: 'Inter',
                            fontWeight: 'bold',
                            fontSize: 22, mr:1
                            }} display="inline">
                            Air Carbon Emissions Saved:
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
                        // fontWeight: 'light',
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
        </div>
    );
}
