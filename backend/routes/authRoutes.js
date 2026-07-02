import express from "express";
import { body } from "express-validator";

import {
  registerUser,
  loginUser,
} from "../controllers/authController.js";

const router = express.Router();

// Register
router.post(
  "/register",
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required"),

    body("email")
      .isEmail()
      .withMessage("Valid email required"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  registerUser
);

// Login
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Valid email required"),

    body("password")
      .notEmpty()
      .withMessage("Password is required"),
  ],
  loginUser
);

export default router;