import axios from "axios"

const urlProduction = ""
const urlDev = "http://localhost:5000/api"

const httpClient = axios.create({baseURL: urlDev})

export default httpClient