import express from "express";
import { body } from "express-validator";

import { protect } from "../middleware/authMiddleware.js";

import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

const taskValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .optional()
    .trim(),
];

// Create
router.post("/", protect, taskValidation, createTask);

// Get All
router.get("/", protect, getTasks);

// Get One
router.get("/:id", protect, getTaskById);

// Update
router.put("/:id", protect, taskValidation, updateTask);

// Delete
router.delete("/:id", protect, deleteTask);

export default router;