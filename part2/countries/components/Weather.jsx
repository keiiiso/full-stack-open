import {useEffect, useState} from 'react'
import axios from 'axios'

export const Weather = ({country}) => {
    const [weatherImage, setWeatherImage] = useState('')
    const [temperature, setTemperature] = useState('')
    const [wind, setWind] = useState('')
    const api_key = import.meta.env.VITE_OPENWEATHER_API

    useEffect(() => {
        if (country) {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
                .then(response => {
                    setTemperature(`${response.data.main.temp} Celsius`)
                    setWind(`${response.data.wind.speed} m/s`)
                    setWeatherImage(`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
                })
        }
    }, [country])

    if (!country) {
        return null
    } else {
        return (
            <>
                <h2>Weather in {country.capital}</h2>
                <p>temperature: {temperature} </p>
                <img src={weatherImage} alt="weather logo"/>
                <p>wind: {wind}</p>
            </>
        )
    }
}