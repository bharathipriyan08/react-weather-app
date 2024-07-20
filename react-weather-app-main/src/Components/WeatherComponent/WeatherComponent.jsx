import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import './WeatherComponent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faMoon, faSun, faTemperatureThreeQuarters, faUpDown, faUpDownLeftRight, faWater, faWind } from '@fortawesome/free-solid-svg-icons';

export const WeatherComponent = () => {

    const [cityName,setCityName]=useState('')
    const API_KEY='f35abbac88d148299af54246231309'
    const [weatherData, setWeatherData]=useState({})
    const [latitude, setLat]=useState(0)
    const [longitude, setlong]=useState(0)
    

    const handleCityName=(event)=>{
        setCityName(event.target.value)
    }

    // useMemo(()=>{
    //     getCurrentLocation();
    // },[latitude, longitude])

    useEffect(() => {
        getCurrentLocation();
    },[latitude, longitude])

    const getCurrentLocation=async()=>{

        navigator.geolocation.getCurrentPosition(async(position)=>{
            
            setLat(position.coords.latitude)
            setlong(position.coords.longitude)

            const current = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`)
           
            console.log(current.data)
            setWeatherData(current.data)

              
    })

    }
    
    const getWeather=async()=>{
        const response= await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`)
        console.log(response.data)
        setWeatherData(response.data)
    }

    



  return (
    <section className='main'>
        <div className='weather_app_container'>
        <div className='search_bar'>
            <input
            type='text'
            placeholder='Enter your city'
            onChange={handleCityName}
            onKeyDown={getWeather}
            />
            <button onClick={getWeather} className='search_button'>Get weather</button>
        </div>
        <div className='weather_details_container'>
            <div className='weather_location_card'>
                {weatherData.location && <img src={weatherData.current.condition.icon}/>}
                <div className='weather_location_data'>
                {weatherData.location && <p>{weatherData.current.condition.text}</p>}
                {weatherData.location && <p>{weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}</p>}
                </div>
            </div>
           <div className='weather_data'>
            {weatherData.location && <p className='weather'><FontAwesomeIcon icon={faTemperatureThreeQuarters}/>{weatherData.current.temp_c}&deg;c</p>}
            {weatherData.location && <p className='weather'><FontAwesomeIcon icon={faWater}/>{weatherData.current.humidity}%</p>}
            {weatherData.location && <p className='weather'><FontAwesomeIcon icon={faWind}/>{weatherData.current.wind_kph}kph</p>}
           </div>
           <div className='weather_data'>
            {weatherData.location && <p className='weather'><FontAwesomeIcon icon={faCompass}/>{weatherData.current.wind_degree}&deg;</p>}
            {weatherData.location && <p className='weather'><FontAwesomeIcon icon={faUpDownLeftRight}/>{weatherData.current.wind_dir}</p>}
            {/* {weatherData.location && weatherData.location.current && weatherData.location.current.is_day ?
          <p className='weather'><FontAwesomeIcon icon={faSun}/> Day</p> :<p className='weather'><FontAwesomeIcon icon={faMoon}/> Night</p>} */}

           </div>

        </div>
        </div>
    </section>
  )
}
