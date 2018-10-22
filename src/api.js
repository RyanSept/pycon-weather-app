import axios from 'axios';

export default function getWeather(city) {
    console.log(process.env.REACT_APP_API_URL);
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    return axios.get(`${API_URL}/weather`, {
        params: { city }
    });
}
