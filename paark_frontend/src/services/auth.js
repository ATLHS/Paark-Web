import axioConfig from "./config/axiosConfig";

const admin = {
  isLoggedIn() {
    return axioConfig
      .get("/api/admin/is-authenticate")
      .then(({ data }) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
  handleSignOut() {
    return axioConfig
      .get("/api/admin/signout")
      .then(({ data }) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
};

export default admin;
