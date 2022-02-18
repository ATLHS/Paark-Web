const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);
module.exports = {
  createCustomer: ({ name, phone }) => {
    return stripe.customers
      .create({
        name,
        phone,
      })
      .then((customer) => {
        return customer;
      })
      .catch(() => {
        return false;
      });
  },
};
