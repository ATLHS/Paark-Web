import axioConfig from "./config/axiosConfig";

const payment = {
  getPaymentIntent(userData) {
    return axioConfig
      .post("/api/payment/create-payment-intent", { userData })
      .then((data) => data)
      .catch(({ response }) => Promise.reject(response.data));
  },
};

export default payment;
