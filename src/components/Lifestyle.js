import React , {useEffect} from 'react';
import {Box, ToggleButton, ToggleButtonGroup, Typography} from '@mui/material';
import carbonData from '../carbonemissions.json';
import HelpIcon from '@mui/icons-material/Help';
import { styled } from '@mui/material/styles';
import "./Lifestyle.css";

export default function Lifestyle({data, onChange}) {
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
    const [recycling, setRecycling] = React.useState('list');
    const [meatNum, setMeatNum] = React.useState('list');
    const [onlineClothes, setOnlineClothes] = React.useState('list')

    useEffect(()=> {
        setRecycling(data?.data?.recycling)
        setMeatNum(data?.data?.meatNum)
        setOnlineClothes(data?.data?.onlineClothes)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=> {
        onChange(
            {
                data: {
                    recycling: recycling,
                    meatNum: meatNum,
                    onlineClothes: onlineClothes
                },
                total: getCarbonEmissions()
            }   
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recycling, meatNum, onlineClothes])

    //Inputs
    const changeRecycling = (event, nextView) => {
        setRecycling(nextView);
    };
    const changeMeatNum = (event, nextView) => {
        setMeatNum(nextView);
    };
    const changeOnlineClothes = (event, nextView) => {
        setOnlineClothes(nextView);
    }; 

    const getCarbonEmissions = () => {
        let carbonTotal = carbonData['lifestyle']['recycling'][recycling] + 
        carbonData['lifestyle']['meatNum'][meatNum] +
        carbonData['lifestyle']['onlineClothes'][onlineClothes]
       
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
                Ideally how much of your plastic and paper would you recycle?               <br/>
                <CustomToggleG
                    className='options'
                    orientation="horizontal"
                    value={recycling}
                    exclusive
                    onChange={changeRecycling}
                >
                    <ToggleButtonStyle value="0">
                        None
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="25">
                        25% 
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="50">
                        50% 
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="75">
                        75%
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="100">
                        100% 
                    </ToggleButtonStyle>
                </CustomToggleG>
                <br/>

                How much meat would you cut out from your diet (weekly)?
                <br/>
                <CustomToggleG
                    className='options'
                    orientation="horizontal"
                    value={meatNum}
                    exclusive
                    onChange={changeMeatNum}
                >
                    <ToggleButtonStyle value="none">
                        None
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="1Pound">
                        1 pounds
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="3Pounds">
                        3 pounds
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="5Pounds">
                        5 pounds
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="5+Pounds">
                        5+ pounds
                    </ToggleButtonStyle>
                </CustomToggleG>
                <br/>

                Ideally how many of your online clothing purchases would be carbon neutral shipping?, 
                <br/>
                <CustomToggleG
                    className='lastOptions'
                    orientation="horizontal"
                    value={onlineClothes}
                    exclusive
                    onChange={changeOnlineClothes}
                >
                    <ToggleButtonStyle value="0">
                        None
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="25">
                        25% 
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="50">
                        50% 
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="75">
                        75%
                    </ToggleButtonStyle>
                    <ToggleButtonStyle value="100">
                        100% 
                    </ToggleButtonStyle>
                </CustomToggleG>
                <div>
                    <Typography 
                        sx={{
                            fontFamily: 'Inter',
                            fontWeight: 'bold',
                            fontSize: 22, mr:1
                            }} display="inline">
                            Lifestyle Carbon Emissions Saved:
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