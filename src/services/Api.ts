import axios from "axios";

const urlProduction = "https://entregae-backend.herokuapp.com/";
const urlDev = "http://localhost:5000/";

const Api = axios.create({ baseURL: urlProduction });

export default Api;
