const { getuser, postdata, login } = require("../controllers/authUser");
const {
  loginValidation,
  signupValidation,
} = require("../middlewares/serverValidation");

const router = require("express").Router();

router.get("/", getuser);
router.post("/signup", signupValidation, postdata);
router.post("/login", loginValidation, login);

module.exports = router;
