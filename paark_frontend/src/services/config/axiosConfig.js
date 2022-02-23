const axios = require("axios");

const axiosInstance = axios.create({
  withCredentials: true,
});

export default axiosInstance;
