const axios = require("axios").default;

const user = {
  handleUserInformation(data) {
    return axios
      .post("/api/user/user-information", { data })
      .then(({ data }) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
  handleUserPhoneCode(data) {
    return axios
      .post("/api/user/confirm-user-phone", { data })
      .then(({ data }) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
  handleUserPhone(data) {
    return axios
      .post("/api/user/user-phone", { data })
      .then(({ data }) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
};

export default user;
