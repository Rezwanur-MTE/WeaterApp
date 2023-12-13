import { useEffect, useState } from 'react'
import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import './Style.css'
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState(
  {
    celcius: 23,
    name:'Dhaka',
    humidity: 17,
    speed: 2,
    image: "./imgs/cloud.png"
  }
  );

  const [name,setName]= useState('');

  const handleClick=()=>{
     if(name!==" "){

      const URL= `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=2d0611cf476335e15e8c6e1ab86a35fe&units=metric`;
      axios.get(URL)
      .then(res=>{
        let imagePath='';
        if(res.data.weather[0].main=="Clouds"){
          imagePath="./imgs/cloud.png"

        } else if(res.data.weather[0].main=="Clear"){
          imagePath="./imgs/sun.png"

        } else if(res.data.weather[0].main=="Rain"){
          imagePath="./imgs/rain.png"

        }else if(res.data.weather[0].main=="Drizzle"){
          imagePath="./imgs/drizzle.png"

        }else if(res.data.weather[0].main=="Mist"){
          imagePath="./imgs/mist.png"

        } else {
          imagePath="./imgs/cloud.png"
        }
         console.log(res.data);
        setData({...data, celcius: res.data.main.temp, 
                          name: res.data.name, 
                          humidity: res.data.main.humidity, 
                          speed: res.data.wind.speed,
                          image: imagePath})
      })
      .catch(err=> console.log(err));

     }
  }

  return (
    <>
    <h1> Hey .. I am your weather dude</h1> 
    <hr></hr>
    <div className='Weather'>
      <div className='search'>
        <input type='text' placeholder='Enter city name' onChange={e=> setName(e.target.value)}/>
        <button style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center' }} onClick={handleClick} >
            <img src='./imgs/search.png' alt='logo' style={{ width: '70px', height: '22px' }} />
        </button>
      </div>

    <div className='winfo'>
      <img src={data.image} alt='cloud logo' />
      <h1> {data.celcius}</h1>
      <h3>{data.name}</h3>
      <div className='details'>
        <div className='col'>
          <img src='./imgs/humidity.png' alt='logo' style={{height:'80px', width:'80px'}}/>
          <div className='humidity'>
            <p>{data.humidity}</p>
            <p>Humidity</p>
            </div>
        </div>
        <div className='col'>

        <img src='./imgs/wind.png' alt='logo'/>
          <div className='wind'>
            <p>{data.speed}</p>
            <p>Speed</p>
            </div>

        </div>
      </div>
    </div>
    </div>

    </>
  )
}

export default App
