import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import { render } from '@testing-library/react';
function App(){
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(0);
  useEffect(() => { //rendered only once
    getPosts() //fetches once
    const interval=setInterval(()=>{
      getPosts()
     },1000) //fetches every second (1000ms)
     return()=>clearInterval(interval) //interval is cleared if user navigates to another page
}, []) 

    const getPosts = async () => { //Asyncronsly calls the API, can render page before fetch gets a response
        try {
      const userPosts = fetch('https://api.thingspeak.com/channels/1714820/fields/1.json?results=2')
      .then(response => response.json())
      .then((data) => {
        setCount(data['feeds'][data['feeds'].length - 1]['field1']) //cleaning the data, getting the field for the latest count from the JSON
      }) 
        
        } catch (err) { //errors
          console.error(err.message);
        }
    };

  return (
    <div className = "App">
      <div className = "logo">
        <img src = " https://recsports.virginia.edu/system/files/IMRec_PowerLogo_Horizontal_OrangeWhite_RGB-01.png"></img>
      </div>
      <div className = "header">
        <h1>
          Aquatic Fitness Center Occupancy
        </h1>
      </div>
      <div className = "count">
        <h1>{count}</h1> 
      </div>
    </div>
    
  )
}

export default App