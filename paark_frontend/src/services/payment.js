const axios = require("axios").default;

const payment = {
  getPaymentIntent(userData) {
    return axios
      .post("/api/payment/create-payment-intent", { userData })
      .then((data) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
};

export default payment;
