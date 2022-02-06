const axios = require("axios").default;

const user = {
  handleUserInformation(data) {
    return axios
      .post("/api/user/user-information", { data })
      .then(({ data }) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
};

export default user;
