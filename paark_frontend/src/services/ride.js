import axioConfig from "./config/axiosConfig";

const ride = {
  getAllride() {
    return axioConfig
      .get("/api/ride/rides")
      .then(({ data }) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
};

export default ride;
