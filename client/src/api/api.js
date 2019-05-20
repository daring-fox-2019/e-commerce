import axios from 'axios'

let token = localStorage.getItem("token");


const server = axios.create({    
    baseURL: process.env.VUE_APP_BACKEND_LOCAL || `http://localhost:3000`,    
    headers: {
        token
    }
})
export default server