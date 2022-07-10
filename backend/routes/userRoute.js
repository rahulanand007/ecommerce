const express = require("express")
const {registerUser, getAllUsers, loginUser, logout, forgotPassword, getUserDetails, updatePassword, updateProfile, getSingleUser, deleteUser, updateUserRole} = require("../controllers/userController")
const { isAuthenticatedUser , authorizeRoles} = require("../middleware/auth");



const router = express.Router();

router.route("/register").post(registerUser)
router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"),getAllUsers)
router.route("/login").post(loginUser)
router.route("/logout").get(logout)
router.route("/password/forgot").post(forgotPassword)
router.route("/me").get(isAuthenticatedUser,getUserDetails)
router.route("/password/update").put(isAuthenticatedUser,updatePassword)
router.route("/me/update").put(isAuthenticatedUser,updateProfile)
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser)
router.route("/admin/user/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRole)
router.route("/admin/user/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser)



//To be deleted later
router.route("/users").get(getAllUsers)


module.exports = router;