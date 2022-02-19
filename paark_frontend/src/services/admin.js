const axios = require("axios").default;

const admin = {
  handleAdminLogin(data) {
    return axios
      .post("/api/admin/login", { data })
      .then(({ data }) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
  handleAdminSignUp(data) {
    return axios
      .post("/api/admin/signup", { data })
      .then(({ data }) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
};

export default admin;
