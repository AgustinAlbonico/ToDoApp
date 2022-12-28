const User = require("../models/User");

const getUserInfo = async (req, res) => {
  try {
    const data = await User.findById(req.user.id).select("name email");
    return res.status(200).json(data);
  } catch (error) {
    res.status(501).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: req.body.name,
        email: req.body.email,
      },
      { new: true }
    ).select("email name");
    return res.status(200).json(updatedUser);
  } catch (error) {
    res.status(501).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("name email");
    return res.status(200).json(users);
  } catch (error) {
    res.status(501).json(error);
  }
};

module.exports = {
  getUserInfo,
  updateUser,
  getUsers
};
