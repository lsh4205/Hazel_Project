import React, { Suspense } from 'react';
import {Canvas, useLoader} from '@react-three/fiber';
import {Clone, useGLTF, Environment, OrbitControls} from '@react-three/drei';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {Container} from '@mui/material';
// import viz from '../images/viz_images/s7.png';
// import terrain from '../images/3d_objs/the_river.glb';
// import mPath from '../images/3d_objs/t1.glb';
// import mPath1 from '../images/3d_objs/low_tree1.glb';
// import mPath2 from '../images/3d_objs/low_poly_tree_fall.glb';
// import mPath3 from '../images/3d_objs/giant_tree.glb';
// import pPath from '../images/3d_objs/plant1.glb';
import S1_DryGround from '../images/3d_objs/S1_DryGround.glb';
import S2_BareGrass from '../images/3d_objs/S2_BareGrass.glb';
import S3_Grass from '../images/3d_objs/S3_Grass.glb';
import S4_MinimalTrees from '../images/3d_objs/S4_MinimalTrees.glb';
import S5_Forest from '../images/3d_objs/S5_Forest.glb';
import S6_SomeAnimals from '../images/3d_objs/S6_SomeAnimals.glb';
import S7_MoreAnimals from '../images/3d_objs/S7_MoreAnimals.glb';
// import mPath1 from '../images/3d_objs/low_tree1.glb';
// import mPath2 from '../images/3d_objs/low_poly_tree_fall.glb';
// import mPath3 from '../images/3d_objs/giant_tree.glb';
// import pPath from '../images/3d_objs/plant1.glb';
import carbonData from '../carbonemissions.json';
// import { getCarbonEmissions } from './MainPanel.js';


export default function VisualPanel({data, onChange, carbonEmissions}) {
    const borderR = '16px';
    const imageStyle = {width: "100%", height: "100%"};
    // const carbonEmissions = props.carbonEmissions;
    // console.log(carbonEmissions);

    const positions= [[0, -2, 0], [1, -2, -1], [2,-2,-1], [7.5, -2, -3], [6,-2,-5],[8,-2,-6], [8.6, -2, -2.7], [5.7,-2,-4.7]];
    // const tree1 = useLoader(GLTFLoader, "./t2.gltf");
    const Model = ({url, scale, position}) => {
        const gltf = useGLTF(url);
        return <primitive object={gltf.scene} scale={scale} position={position} />;
    }
    // const Model_C = ({url, scale, position}) => {
    //     const gltf = useGLTF(url);
    //     return <Clone object={gltf.scene} scale={scale} position={position}/>;
    // }

    

    function getModelForCarbonTotal(carbonEmissions) {
      carbonEmissions = parseInt(carbonEmissions);
        if (0 <= carbonEmissions && carbonEmissions < 2500) {
          return S1_DryGround;
        } else if (2500 <= carbonEmissions && carbonEmissions < 5000) {
          return S2_BareGrass;
        } else if (5000 <= carbonEmissions && carbonEmissions < 7500) {
          return S3_Grass;
        } else if (7500 <= carbonEmissions && carbonEmissions < 10000) {
          return S4_MinimalTrees;
        } else if (10000 <= carbonEmissions && carbonEmissions < 12500) {
          return S5_Forest;
        } else if (12500 <= carbonEmissions && carbonEmissions < 15000) {
          return S6_SomeAnimals;
        } else {
          return S7_MoreAnimals;
        }
      }

    return (
        // <Container
        //     sx={{
        //         backgroundColor: '#FCFFF4',
        //         borderRadius: borderR,
        //         boxShadow: 3, padding: "10px", alignItems: "center", justifyItems: "center"
        //     }}
            
        // >
            <Canvas 
                camera={{position:[0,4.3,3.5]}}
                shadows 
                style={{'position': 'absolute', 'width': '100%', 'height':'100%', zindex: 0}}
               >
                <Suspense fallback={null}>
                    <OrbitControls target={[-0.5,-3.1,-3.8]}/>


                    {/* // I want to make this a function that takes in the carbonTotal and returns one of the models between S1 and S7 based on the carbonTotal */}
                    <Model url={getModelForCarbonTotal(carbonEmissions)} scale={3} position={[3, -2.1, -3.8]} />

                    {/* <Model url={S1_DryGround} scale={3} position={[3,-2.1,-3.8]}/> */}
                    {/* <Model url={mPath} scale={0.08} position={positions[3]}/>
                    <Model_C url={mPath} scale={0.08} position={[0,-2,-3]}/>

                    <Model url={mPath1} scale={0.0014} position={[1, -2, -4.5]}/>
                    <Model_C url={mPath1} scale={0.0010} position={positions[6]}/>
                    <Model_C url={mPath1} scale={0.0007} position={positions[7]}/>

                    <Model url={mPath2} scale={2} position={[2,-2,-4.5]}/>
                    <Model_C url={mPath2} scale={2.4} position={[6,-2,-5]}/>
                    
                    <Model url={pPath} scale={0.5} position={[1,-2,-3.5]}/>

                    <Model url={mPath3} scale={0.15} position={[5,-2,-7]}/> */}
                    
                    <Environment preset='city'/>
                </Suspense>
            </Canvas>
        //     {/* <Box component="img" src={viz} alt="img" style={imageStyle}/>  */}
        // </Container>
    );
}