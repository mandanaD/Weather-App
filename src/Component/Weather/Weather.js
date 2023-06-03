import "./Weather.css"
import {useEffect, useState} from "react";
import {Sun, CloudRain, CloudLightning, CloudSnow, Cloud, AlignCenter, Moon} from "react-feather";
import axios from "axios";

const Weather = () => {
    let icon;
    const [temperature, setTemperature] = useState({
        temperatureInFahrenheit: 0,
        temperatureInCelsius: 0,
        icon: '',
        des: ''
    })
    const [time, setTime] = useState({
        hour: 0,
        minute: 0,
    })
    const [date, setDate] = useState({
        month: 0,
        day: 0,
        week: 0
    })
    const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]
    const day = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ]

    useEffect(() => {
        let myDate = new Date()
        setTime({hour: myDate.getHours(), minute: myDate.getMinutes()})
        setDate({month: myDate.getMonth(), day: myDate.getDate(), week: myDate.getDay()})
    }, [])
    useEffect(() => {
        let apiKey = "e58c77d66e9d7c8b7e95eb6a81d77fb3";
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Tehran&units=metric&appid=${apiKey}`)
            .then((response) => {
                const res = response.data.main.temp
                setTemperature({
                    temperatureInCelsius: res,
                    temperatureInFahrenheit: (res * 9 / 5) + 32,
                    icon: response.data.weather[0].icon,
                    des: response.data.weather[0].description
                })
            })
    }, [])
    switch (temperature.icon) {
        case "01d":
            icon = <Sun size={70} color={"#d26326"}/>;
            break;
        case "01n":
            icon = <Moon size={70} color={"#939393"}/>;
            break;
        case "02d":
        case "02n":
            icon = <Cloud size={70} color={"#ece9e9"}/>;
            break;
        case "03d":
        case "03n":
            icon = <Cloud size={70} color={"#939393"}/>;
            break;
        case "04d":
        case "04n":
            icon = <Cloud size={70} color={"#504f4f"}/>;
            break;
        case "09d":
        case "09n":
            icon = <CloudRain size={70} color={"#4b78ce"}/>;
            break;
        case "10d":
        case "10n":
            icon = <CloudRain size={70} color={"#020242"}/>;
            break;
        case "11d":
        case "11n":
            icon = <CloudLightning color={"#000000"} size={70}/>;
            break;
        case "13d":
        case "13n":
            icon = <CloudSnow color={"#a8a8a8"} size={70}/>;
            break;
        case "50d":
        case "50n":
            icon = <AlignCenter color={"#a8a8a8"} size={70}/>;
            break;
        default:
            icon = null;
    }

    return (
        <div className={"container"}>
            <div className={"description"}>
                {temperature.des}
            </div>
            <div className="wave one">
            </div>
            <div className="wave two">
            </div>
            <div className="wave tree">
            </div>
            <div className={"box"}>
                {icon}
            </div>
            <div className={"info"}>
                <div className="city">Tehran</div>
                <div className="date">
                    {(day[date.week]).toUpperCase()} | {month[date.month]} {date.day} | {(time.hour) + 1} : {time.minute}
                </div>
                <div className="temperature">
                    {Math.floor(temperature.temperatureInCelsius)}&#176; C
                    | {Math.floor(temperature.temperatureInFahrenheit)}&#176; F
                </div>
            </div>

        </div>
    );
}

export default Weather;