import axios from 'axios';


const server = axios.create({
   baseURL:import.meta.env.VITE_SERVER_URL

});

export default server;