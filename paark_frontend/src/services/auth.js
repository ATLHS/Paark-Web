import axioConfig from "./config/axiosConfig";

const admin = {
  isLoggedIn() {
    return axioConfig
      .get("/api/admin/is-authenticate")
      .then(({ data }) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
};

export default admin;
