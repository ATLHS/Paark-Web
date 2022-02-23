import axioConfig from "./config/axiosConfig";

const admin = {
  handleAdminLogin(data) {
    return axioConfig
      .post("/api/admin/login", { data })
      .then(({ data }) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
  handleAdminSignUp(data) {
    return axioConfig
      .post("/api/admin/signup", { data })
      .then(({ data }) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
  handleAdminConfirmedCode(data) {
    return axioConfig
      .post("/api/admin/confirmed-code", { data })
      .then(({ data }) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
  handleAdminPassword(data) {
    return axioConfig
      .post("/api/admin/password", { data })
      .then(({ data }) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
};

export default admin;
