import axioConfig from "./config/axiosConfig";

const contact = {
  sendSupportMessage(data) {
    return axioConfig
      .post("/api/message/send-support-message", { data })
      .then(({ data }) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
};

export default contact;
