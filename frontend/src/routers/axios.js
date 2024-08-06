import axios from "axios";
// Configure axios (set base URL or other settings if needed)
axios.defaults.baseURL = "http://127.0.0.1:5000/api";
console.log("Axios base URL set to:", axios.defaults.baseURL); // Debug statement
export default axios;
