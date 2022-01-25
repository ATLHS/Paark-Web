const axios = require("axios").default;

const getUserCar = {
  getUserCarReservation(data) {
    return axios
      .post("/api/get-user-car/get-car", { data })
      .then(({ data }) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
};

export default getUserCar;
