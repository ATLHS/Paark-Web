const router = require("express").Router();
const bcrypt = require("bcrypt");

const saltRounds = 12;
router.post("/return-car", async (req, res) => {
  console.log(req.body, "body");
});

module.exports = router;
