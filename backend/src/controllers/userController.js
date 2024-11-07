const { User } = require("../models");
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer', '');
  if (!token) {
    return next();
  }
  try {
    const decoded = jwt.verify(token, 'secret');
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(403).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const loginUser = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ where: { userName } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ id: user.id }, 'secret', { });
    return res.status(200).json({ message: 'Login successfully', token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { userName } });
    console.log(existingUser);
    if (existingUser) {
      return res.status(409).json({ error: "userName already in use" });
    }

    const newUser = await User.create({ userName, password });
    return res
      .status(201)
      .json({ message: "Usuário criado com sucesso", user: newUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { loginUser, registerUser, getAllUsers, authenticate };
