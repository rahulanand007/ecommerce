const express = require("express")
const {registerUser, getAllUsers, loginUser, logout} = require("../controllers/userController")

const router = express.Router();

router.route("/register").post(registerUser)
router.route("/users").get(getAllUsers)
router.route("/login").post(loginUser)
router.route("/logout").get(logout)


module.exports = router;