import React, { Component } from 'react';
const Practice = () => {
    const seats = React.createRef();
    const handleSeats = (e) => {
        e.preventDefault();
        console.log(seats.current.value);
    }
    return ( 
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "50px"}}>
            <input type="text" ref={seats}/>
            <button onClick={handleSeats}>Allot</button>
        </div>
     );
}
 
export default Practice;