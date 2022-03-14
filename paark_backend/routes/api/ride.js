const router = require("express").Router();
const Ride = require("../../models/ride");
const User = require("../../models/user");

router.get("/rides", async (req, res) => {
  const user = await User.find({}, "_id firstname phone rides")
    .populate({
      path: "rides",
      match: {
        status: {
          $in: ["Enregistré", "En chemin", "Pris en charge"],
        },
      },
    })
    .exec();

  res.status(200).json({ user });
});

module.exports = router;
