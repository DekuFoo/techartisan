const { Router } = require("express");
const AuthController = require("../controllers/authController.js");
const AuthValidator = require("../validators/auth.js");

const router = Router();

router.post("/sign-in", AuthValidator.signIn, AuthController.signIn);
router.post("/sign-up", AuthValidator.signUp, AuthController.signUp);
router.post("/logout", AuthValidator.logOut, AuthController.logOut);
router.post("/refresh", AuthValidator.refresh, AuthController.refresh);

module.exports = router;
