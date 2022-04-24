const router = require("express").Router();
const User = require("../../models/user");
const Ride = require("../../models/ride");
const sendEmail = require("../../services/send_email");
const sendSMS = require("../../services/send_sms");
const randomNumber = require("../../utils/randomDigitNumber.js");
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

router.post("/stripe/webhooks-event", async (req, res) => {
  let event = req.body;
  const dropOffCode = randomNumber.randomFourDigitNumber();
  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const { customer } = event.data.object;
      const user = await User.findOne({ stripeCustomerId: customer });

      const userRide = await Ride.findOneAndUpdate(
        { userId: user._id },
        { status: "En chemin", dropOffCode },
        {
          new: true,
        },
        async (err) => {
          if (err) {
            console.log(err);
          }
        }
      ).clone();

      const userWIthPopulatedRides = await User.findOne(
        {},
        "_id firstname phone rides"
      )
        .populate({
          path: "rides",
          match: {
            status: {
              $in: ["En chemin"],
            },
          },
        })
        .exec();

      sendSMS.sendNewReservationNotification();
      sendSMS.sendUserReservationNotification(
        user.phone,
        userRide.hour,
        userRide.address,
        dropOffCode
      );
      break;
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
});

module.exports = router;
