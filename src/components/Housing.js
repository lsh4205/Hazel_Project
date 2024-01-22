import React, {useEffect} from 'react';
import {Box, ToggleButton, ToggleButtonGroup, Typography} from '@mui/material';
import carbonData from '../carbonemissions.json';
import HelpIcon from '@mui/icons-material/Help';
import { styled } from '@mui/material/styles';
import "./Housing.css"

export default function Housing({data, onChange}) {
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
    const [bedroomNum, setBedroomNum] = React.useState('list');
    const [areaType, setAreaType] = React.useState('list');
    const [totalPeople, setTotalPeople] = React.useState('list')

    useEffect(()=> {
        setBedroomNum(data?.data?.bedroomNum)
        setAreaType(data?.data?.areaType)
        setTotalPeople(data?.data?.totalPeople)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=> {
        onChange(
            {
                data: {
                    bedroomNum: bedroomNum,
                    areaType: areaType,
                    totalPeople: totalPeople
                },
                total: getCarbonEmissions()
            }   
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bedroomNum, areaType, totalPeople])


    //Inputs
    const changeBedroomNum = (event, nextView) => {
        setBedroomNum(nextView);
    };
    const changeAreaType = (event, nextView) => {
        setAreaType(nextView);
    };
    const changeTotalPeople = (event, nextView) => {
        setTotalPeople(nextView);
    }; 
    const getCarbonEmissions = () => {
        let carbonTotal = 3750 - (carbonData['housing']['bedroomNum'][bedroomNum] * 
        carbonData['housing']['areaType'][areaType] *
        carbonData['housing']['totalPeople'][totalPeople])
       
        return carbonTotal ? carbonTotal : 0
    }

    return (
        <div>
            <Typography  
                sx={{
                    fontFamily: 'Inter',
                    fontWeight: 'bold',
                    fontSize: 24, marginBottom: 1
                    }}>
                    Measure Your Impact 
            </Typography>
            <Box sx={{fontFamily: 'Inter', fontSize: 14}} className="inputQuestion">
                How many bedrooms would your home have?
                <br/>
                <CustomToggleG
                    className='options'
                    orientation="horizontal"
                    value={bedroomNum}
                    exclusive
                    onChange={changeBedroomNum}
                >
                    <ToggleButtonStyle value="1-2Bedrooms">
                        1-2 bedrooms
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="2-4Bedrooms">
                        2-4 bedrooms
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="4+Bedrooms">
                        4+ bedrooms
                    </ToggleButtonStyle>
                </CustomToggleG>
                <br/>

                What type of area would you live in?
                <br/>
                <CustomToggleG
                    className='options'
                    orientation="horizontal"
                    value={areaType}
                    exclusive
                    onChange={changeAreaType}
                >
                    <ToggleButtonStyle value="rural">
                        Rural 
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="suburbs">
                        Suburbs
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="urban">
                        Urban
                    </ToggleButtonStyle>
                </CustomToggleG>
                <br/>

                How many people would live in Your house?
                <br/>
                <CustomToggleG
                    className='lastOptions'
                    orientation="horizontal"
                    value={totalPeople}
                    exclusive
                    onChange={changeTotalPeople}
                >
                    <ToggleButtonStyle value="1-2People">
                        1-2 People
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="3-4People">
                        3-4 People
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="5+People">
                        5+ People
                    </ToggleButtonStyle>
                </CustomToggleG>
                <div>
                    <Typography 
                        sx={{
                            fontFamily: 'Inter',
                            fontWeight: 'bold',
                            fontSize: 22, mr:1
                            }} display="inline">
                            Housing Carbon Emissions Saved:
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