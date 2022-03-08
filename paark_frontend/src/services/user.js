import axioConfig from "./config/axiosConfig";

const user = {
  handleUserInformation(data) {
    return axioConfig
      .post("/api/user/user-information", { data })
      .then(({ data }) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
  handleUserPhoneCode(data) {
    return axioConfig
      .post("/api/user/confirm-user-phone", { data })
      .then(({ data }) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
  returnUserCar(data) {
    return axioConfig
      .post("/api/user/return-user-car", { data })
      .then(({ data }) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
};

export default user;
