const { Task } = require("../models");

const createTask = async (req, res) => {
  try {
    const { description, status, assignedTo, categories } = req.body;
    const userId = req.user ? req.user.id : null;
    const task = await Task.create({
      description,
      assignedTo,
      status,
      categories,
      userId,
    });

    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user) {
      tasks = await Task.findAll({ where: { userId: req.user.id } });
    } else {
      tasks = await Task.findAll({ where: { userId: null } });
    }

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.findAll({ where: { userId } });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (task) {
      return res.status(200).json(task);
    } else {
      return res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { description, status, assignedTo } = req.body;

    const task = await Task.findByPk(req.params.id);

    if (task) {
      await task.update({ description, status, assignedTo });

      await task.reload();

      return res.status(200).json(task);
    } else {
      return res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (task) {
      await task.destroy();

      return res.status(204).send();
    } else {
      return res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getUserTasks,
};
