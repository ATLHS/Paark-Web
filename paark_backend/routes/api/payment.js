const router = require("express").Router();
const User = require("../../models/user");
const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);

router.post("/create-payment-intent", async (req, res) => {
  const { user_id } = req.body.userData;
  const user = await User.findOne({ _id: user_id });

  const customer = await stripe.customers.retrieve(user.stripeCustomerId);

  // payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 700,
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
    customer: customer.id,
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

router.post("/stripe/webhooks-event", (req, res) => {
  let event = req.body;

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log(paymentIntent.customer, "user stripe id");
      break;
    default:
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

module.exports = router;
