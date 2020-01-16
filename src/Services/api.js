import Axios from 'axios'; 

const api = Axios.create({    
    //baseURL: 'http://10.42.112.48:3333'
    baseURL: 'http://localhost:3333'
}); 
export default api;  