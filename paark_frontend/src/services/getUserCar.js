const axios = require("axios").default;

const getUserCar = {
  getUserCarReservation(data) {
    return axios
      .post("/api/getusercar/getcar", { data })
      .then(({ data }) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
};

export default getUserCar;
