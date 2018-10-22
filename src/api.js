import axios from 'axios';

console.log(process.env.REACT_APP_API_URL);
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';


export function getWeather(city) {
    return axios.get(`${API_URL}/weather`, {
        params: { city }
    });
}

export function postSubscribe(phone_number, city) {
    return axios.post(`${API_URL}/subscribe`, { phone_number, city });
}
