import axios from 'axios'

const ApiCall = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
    // headers: 
})


export default ApiCall