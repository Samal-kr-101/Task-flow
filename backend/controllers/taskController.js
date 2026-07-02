import Task from "../models/Task.js";
import { validationResult } from "express-validator";

// =======================
// Create Task
// POST /api/v1/tasks
// =======================
export const createTask = async (req, res, next) => {
  try {
    // Validation Check
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

// =======================
// Get All Tasks
// GET /api/v1/tasks
// =======================
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      createdBy: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

// =======================
// Get Task By ID
// GET /api/v1/tasks/:id
// =======================
export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

// =======================
// Update Task
// PUT /api/v1/tasks/:id
// =======================
export const updateTask = async (req, res, next) => {
  try {
    // Validation Check
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    task.title = req.body.title ?? task.title;
    task.description = req.body.description ?? task.description;

    if (req.body.completed !== undefined) {
      task.completed = req.body.completed;
    }

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

// =======================
// Delete Task
// DELETE /api/v1/tasks/:id
// =======================
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};