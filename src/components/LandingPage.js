import * as React from "react";
// import {Button, Box} from '@mui/material'; 
import "../App.css";
import screenShot202210 from "../images/icons/screenShot202210.png";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
    

const App = () => {
  const propsData = {
    getStartedButton: {
      disabled: false,
      size: "lg",
      variant: "warning",
      active: true,
      children: "Start",
    },
  };
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `app`; 
        navigate(path);
    }
  return (
    <div className="overlay">
      <div className="num-1-viz-tool-landing-div">
        <span className="landing-page-small-text">Welcome To The Hazel’s</span>
        <span className="landing-page-text">
          Climate Change Visualization Tool
        </span>
        <span className="landing-page-small-text">
          Understand your impact on the environment
        </span>
        <Button
          className="get-started-button"
          style={{cursor:'pointer'}}
          onClick = {routeChange}
          {...propsData.getStartedButton}
        />
      </div>
    </div>
  );
};
export default App;
