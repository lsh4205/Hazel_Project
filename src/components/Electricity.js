import React, {useEffect} from 'react';
import {Box, ToggleButton, ToggleButtonGroup, Typography} from '@mui/material';
import carbonData from '../carbonemissions.json';
import HelpIcon from '@mui/icons-material/Help';
import { styled } from '@mui/material/styles';
import "./Electricity.css";

export default function Electricity({data, onChange}) {
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
    const [powerSource, setPowerSource] = React.useState('list');
    const [electricityBill, setElectricityBill] = React.useState('list');
    const [stoveType, setStoveType] = React.useState('list');

    useEffect(()=> {
        setPowerSource(data?.data?.powerSource)
        setElectricityBill(data?.data?.electricityBill)
        setStoveType(data?.data?.stoveType)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=> {
        onChange(
            {
                data: {
                    powerSource: powerSource,
                    electricityBill: electricityBill,
                    stoveType: stoveType
                },
                total: getCarbonEmissions()
            }   
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [powerSource, electricityBill, stoveType])

    //Inputs
    const changePowerSource = (event, nextView) => {
        
        setPowerSource(nextView);
    };
    const changeElectricityBill = (event, nextView) => {
        setElectricityBill(nextView);
    };
    const changeStoveType = (event, nextView) => {
        setStoveType(nextView);
    }; 
    
    const getCarbonEmissions = () => {
        let carbonTotal = 4655 - (carbonData['electricity']['powerSource'][powerSource] * 
        carbonData['electricity']['electricityBill'][electricityBill] +
        carbonData['electricity']['stoveType'][stoveType])
       
        return carbonTotal ? carbonTotal : 0
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
                Which of the following describes your ideal home power source type?
                <br/>
                <CustomToggleG
                    className='options'
                    orientation="horizontal"
                    value={powerSource}
                    exclusive
                    onChange={changePowerSource}
                >
                    <ToggleButtonStyle value="Renewable">
                        Completely Renewable Energy (ex. Solar Power)
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="Half">
                        Half Renewable Energy
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="Natural">
                        Completely natural gasses
                    </ToggleButtonStyle>
                </CustomToggleG>
                <br/>

                How much would you cut your electricity bill down by? (showers, baths, hot water laundry, etc.)
                <br/>
                <CustomToggleG
                    className='options'
                    orientation="horizontal"
                    value={electricityBill}
                    exclusive
                    onChange={changeElectricityBill}
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

                What type of stove do you use to cook?
                <br/>
                <CustomToggleG
                    className='lastOptions'
                    orientation="horizontal"
                    value={stoveType}
                    exclusive
                    onChange={changeStoveType}
                >
                    <ToggleButtonStyle value="Induction">
                        Induction Stove
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="Electric">
                        Electric Stove
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="Gas">
                        Gas Stove
                    </ToggleButtonStyle>
                </CustomToggleG>
                <div>
                    <Typography 
                        sx={{
                            fontFamily: 'Inter',
                            fontWeight: 'bold',
                            fontSize: 22, mr:1
                            }} display="inline">
                            Electricity Carbon Emissions Saved:
                    </Typography>
                    <Typography 
                        sx={{
                            fontFamily: 'Inter',
                            fontWeight: 'bold',
                            fontSize: 22, color: 'green'
                            }}  display="inline">
                            {getCarbonEmissions().toFixed(0) + " lb"}
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
        </div>
    );
}