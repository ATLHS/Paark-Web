const router = require("express").Router();
const bcrypt = require("bcrypt");

const saltRounds = 12;

// @route POST /api/get-user-car/reservation
// @description get user car
// @access Public
router.post("/getcar", async (req, res) => {
  console.log(req.body, "body");
  res.status(200).json({
    message: `response`,
  });
});

module.exports = router;
