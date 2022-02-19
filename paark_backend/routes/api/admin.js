const router = require("express").Router();

// const AdminUser = require("../../models/admin");
// @route POST /api/admin/login
// @description admin login
// @access Public
router.post("/login", async (req, res) => {
  return res.send({ route: "login" });
});

router.post("/signup", async (req, res) => {
  return res.send({ route: "signup" });
});

module.exports = router;
