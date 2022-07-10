const express = require("express")
const {registerUser, getAllUsers, loginUser, logout, forgotPassword, getUserDetails, updatePassword, updateProfile} = require("../controllers/userController")
const { isAuthenticatedUser , authorizeRoles} = require("../middleware/auth");



const router = express.Router();

router.route("/register").post(registerUser)
router.route("/users").get(getAllUsers)
router.route("/login").post(loginUser)
router.route("/logout").get(logout)
router.route("/password/forgot").post(forgotPassword)
router.route("/me").get(isAuthenticatedUser,getUserDetails)
router.route("/password/update").put(isAuthenticatedUser,updatePassword)
router.route("/me/update").put(isAuthenticatedUser,updateProfile)

module.exports = router;