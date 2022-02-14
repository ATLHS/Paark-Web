const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);

router.post("/create-payment-intent", async (req, res) => {
  // PaymentIntent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 700,
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = router;
