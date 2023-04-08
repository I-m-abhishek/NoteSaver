import React from 'react'
import Addnote from './Addnote';
// import Notes from './Notes';



export const Home = (props) => {
    const showAlert=props;
    return (
        <>
        <Addnote showAlert={showAlert}/>
        {/* <Notes/> */}
        </>
    )
}
export default Home;