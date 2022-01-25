const router = require("express").Router();
const bcrypt = require("bcrypt");
const stripe = require("stripe")("sk_test_VePHdqKTYQjKNInc7u56JBrQ");
const saltRounds = 12;

// @route POST /api/get-user-car/reservation
// @description get user car
// @access Public
router.post("/get-car", async (req, res) => {
  console.log(req.body, "body");

  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  const clientSecret = paymentIntent.client_secret;

  res.status(200).json({
    message: `response`,
  });
});

module.exports = router;
