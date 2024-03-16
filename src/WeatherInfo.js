import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function WeatherInfo() {
    const navigate = useNavigate();
    const handleSayfa = () => {
        navigate('/sayfa2')
    }
    const [coords, setCoords] = useState(null);
    const [current, setCurrent] = useState({
        temp_c: '',
        icon: '',
        feelslike_c: '',
    })
    const [location, setLocation] = useState({
        name: '',
        country: '',
        region: '',
        localtime: ''
    });



    const getLocation = () => {
        if (!navigator.geolocation) {
            alert('Tarayıcınız konum bilgisini desteklemiyor.');
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                const coordsString = ` ${position.coords.latitude},${position.coords.longitude}`;
                setCoords(coordsString);
            });
        }
    }
    useEffect(() => {
        const apiURL = 'http://api.weatherapi.com/v1/current.json?key=af34e68db8c941c9aff115805232112&q=41.2319744,36.356096&aqi=no'
        fetch(apiURL).then(res => res.json()).then((data) => {
            setCurrent({
                temp: data.current.temp_c,
                icon: data.current.condition.icon,
                feelslike_c: data.current.feelslike_c
            })
            setLocation({
                name: data.location.name,
                country: data.location.country,
                region: data.location.region,
                localtime: data.location.localtime
            })
            console.log(data);
        })
    }, [coords]);

    return (
        <div className="container mt-5">
            <div><Button onClick={handleSayfa} variant="info">Sayfaya Dön</Button></div>
            <div className="row justify-content-center">
                <div className="col-md-6 mx-auto weather-card">
                    <h3 className='text-center'>{location.name} Yapay Zeka ile Güzel</h3>
                    <div>{coords && <p>Enlem ve Boylam: {coords}</p>}</div>
                    <div className="text-center">
                        <img src={current.icon} alt="weather-icon" width="150" height="150" />
                        <p>Sıcaklık: {current.temp}°C</p>
                        <p>Hissedilen: {current.feelslike_c}°C</p>
                    </div>
                    <div className="text-center location-info">
                        <p>{location.name} -{location.region} - {location.country}</p>
                        <p>{location.localtime}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherInfo;
