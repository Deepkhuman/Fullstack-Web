const { getuser, postdata, login } = require("../controllers/authUser");

const router = require("express").Router();

router.get("/", getuser);
router.post("/signup", postdata);
router.post("/login", login);

module.exports = router;
