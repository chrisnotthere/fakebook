import axios from "axios";

// Set config defaults when creating the instance
const config = axios.create({
  baseURL: "https://https://fakebook-mernapp.herokuapp.com/",
});

export default config;
