import axios from "axios";

const axiosUtil = axios.create({baseURL: "http://localhost:8000"});

export default axiosUtil;