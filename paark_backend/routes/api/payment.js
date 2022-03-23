const router = require("express").Router();
const User = require("../../models/user");
const Ride = require("../../models/ride");
const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);

router.post("/create-payment-intent", async (req, res) => {
  const { user_id } = req.body.userData;
  const user = await User.findOne({ _id: user_id });
  const customer = await stripe.customers.retrieve(user.stripeCustomerId);

  // payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100,
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

router.post("/stripe/webhooks-event", async (req, res) => {
  let event = req.body;

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const { customer } = event.data.object;
      const user = await User.findOne({ stripeCustomerId: customer });
      await Ride.findOneAndUpdate(
        { userId: user._id },
        { status: "En chemin" },
        {
          new: true,
        },
        async (err) => {
          if (err) {
            console.log(err);
          }
        }
      ).clone();
      break;
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
});

module.exports = router;
