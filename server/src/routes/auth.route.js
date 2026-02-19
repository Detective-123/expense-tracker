import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
} from "../controllers/auth.controller.js";
import { validator } from "../middlewares/validator.middleware.js";

import {
  userRegisterValidator,
  userChangePasswordValidator,
  userForgotPasswordValidator,
  userLoginValidator,
  userResetForgotPasswordValidator,
} from "../validators/index.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/register")
  .post(userRegisterValidator(), validator, registerUser);
router.route("/login").post(userLoginValidator(), validator, loginUser);
router.route("/refresh-token").post(refreshAccessToken)

// protected routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/current-user").get(verifyJWT, getCurrentUser);

export default router;
