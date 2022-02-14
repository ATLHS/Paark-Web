const axios = require("axios").default;

const payment = {
  getPaymentIntent() {
    return axios
      .post("/api/payment/create-payment-intent")
      .then((data) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
};

export default payment;
