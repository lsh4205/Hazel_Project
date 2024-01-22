# HazelViz: Hazel Climate Change Visualization Tool
HazelViz is a dynamic visualization tool that allows users to see how much carbon they can remove from the atmosphere by making certain behavioral changes
suited to their lifestyle. The main purpose of our application is to help reverse the effects of climate change.

# Installation Guide

### Requirements
- [Node.js/npm](https://nodejs.org/en)
- [React.js](https://react.dev/reference/react)
- [Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
### Steps to Run
1. Ensure you are in the project directory (JIE-2350-Hazel) and run the following commands
2. `npm i`
3. `npm start`
4. `cd backend`
5. `npm i`
6. `npm start`

No known problems during setup, installation, and run-time

# Implementation
- Overall project with dynamic visualization
![ezgif com-video-to-gif](https://user-images.githubusercontent.com/63761734/234170876-83d50ca5-bc1a-4493-887c-7349d9bfa51b.gif)

# Release Notes

## Final Version  0.5.0
- Dynamic visualization of users' environmental impact, changing based on their responses to questions, now ranges from a barren, dry forest to a thriving, biodiverse forest. This reflects the severity of users' choices and is directly linked to the **Total Carbon Emissions Saved** by the user.
- Update UI design for **Total Carbon Emissions** to seamlessly blend with the overall design.
- Update UI design in **Project** panels.
- Integrated **Project** panels and **Community** visualization in one page to display the history of Hazel community's savings through their projects and users' donations.
- Update UI design in **Suggestions** with images for each recommendation, showing the amount users can donate to Hazel to offset the carbon emissions they generate.

### Bug Fixes
- Main Visualization was not able to read *Total Carbon Emissions*.
- **Community** Panel overflows.

## Version 0.4.0

### Features
- Visualization for users effect on the environment are now viewable depending on their responses to lifestyle questions.
- Main visualization ranges from poor, dry forest to flourishing, biologically diverse forest to show users the severity of their choices. 
- Users' "Total Carbon Emissions" calculation reported in lbs instead of tons to make it easier to understand.

### Bug Fixes
- Climate visualization appears to the right of questions for each tab and remains consistent across all tabs. 

### Known Issues
- Community page has inconsistent formatting and visualization does not load. 
- Final visualization for each tab does not update dynamically in relation to user's clicks.

## Version 0.3.0

### Features
- Created numerical representations for **Air Travel**, **Car Usage**, **Electricity**, **Lifestyle**, and **Housing** with new styling.
- Numerical representations are now independent of each other and are styled to individual tabs.
- Created the projects tab to show current Hazel projects that can be donated to.

### Bug Fixes
- Landing page gradient previously did not encompass the entire page. Fixed this so that the landing page has a consistent background.

### Known Issues
- Projects tab causes background to change near the bottom of the screen; gradient does not fill screen
- Carbon total states are not saved when coming back from Community page to the Main Panel page.

## Version 0.2.0
### Features
- Modified a landing page design. The landing page is an introductory page of the application that will hook the user in and briefly explain how to use it.
- Created **Air Travel**, **Electricity**, **Lifestyle**, and **Housing** panel based on a template design. 
  - In each category, the panel includes questions and input and calculates the total carbon emission based on user input.
- **[Toggle Button](https://mui.com/material-ui/react-toggle-button/)** design was updated to match the overall design template for better visual consistency. **[Toggle Button](https://mui.com/material-ui/react-toggle-button/)** is used for user input.
  - Font (changed to **Tahoma** for readability)
  - FontWeight (changed to **bold** for readability)
  - Color (changed color of **Selected** button and **Hover** effect)
### Bug Fixes
- Fixed that **[Toggle Button Group](https://mui.com/material-ui/react-toggle-button/)** allowed the multiple selection.

## Version 0.1.0
### Features
- Created a landing page for the application.  The landing page is an introductory page of the application that will hook the user in and briefly explain how to use it.
- Created a template under **Car Usage** for the category page, to be implemented for each category. The purpose of this feature is to prepare our application to take in different types of user input.
  - Included Input fields for users lifestlye choices.
    1. Ideally, what type of car would you drive?
        - Gas-powered car
        - Hybrid car (Half gas, half electric)
        - Electric-powered car
    2. How much less do you want to drive? 
        - ¼ less
        - 1/2  less
        - 3/4 less
        - Maintain driving time
    3. If you were to try to take public transportation to reduce carbon emissions, what would you take?
        - The bus
        - The train/subway
        - Light Rail
        - Streetcar/Trolley
  - Each option uses **[Toggle Button](https://mui.com/material-ui/react-toggle-button/)**, with **[Exclusive Selection](https://mui.com/material-ui/react-toggle-button/#exclusive-selection)** for each question.
- Created functions that are able to read the data from user for future backend tasks. This is an important component in the communication between frontend and backend.
  
  ```javascript
    const carTypeChange = (event, nextView) => {
        // Detect selection changes 
        setCarType(nextView);
        // TODO: Send the changed value to the server
    };
    // ..
  ```
  
- Changed the size of the **Main Panel** for future comprehensive dynamic visualization on the right side. 
  - From a relative size, **92%**, to a fixed size, **550px**, to prevent the content from being hidden.
### Bug Fixes
N/A

# Contributors

Harshsai Dhulipudi: hdhulipudi@gatech.edu

Seonghyun Lee: slee3258@gatech.edu

Raymond Li: ray.li@gatech.edu

Rahi Patel: rpatel646@gatech.edu

Eashan Sinha: esinha6@gatech.edu

Tarun Karthic: tkarthic3@gatech.edu
