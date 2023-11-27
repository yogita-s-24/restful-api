import User from "../models/User.js";

const postApiUsers = async (req, res) => {
    const { userName, email, password } = req.body;
  
    const user = new User({
      userName: userName,
      email: email,
      password: password,
    });
  
    try {
      const saveUserData = await user.save();
  
      res.json({
        success: true,
        data: saveUserData,
        message: "User Create Successfully",
      });
    } catch (err) {
      return res.json({
        success: false,
        error: err.message,
      });
    }
  }

  const getApiUsers = async (req, res) => {
    try {
      const alluserData = await User.find();
      res.json({
        success: true,
        data: alluserData,
        message: "All users",
      });
    } catch (err) {
      res.json({
        success: false,
        message: "Error in fetching the data",
      });
    }
  }

  const deleteApiUsers = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deleteUser = await User.deleteOne({ _id: id });
      res.json({
        success: true,
        data: deleteUser,
        message: "User deleted Successfully.",
      });
    } catch (err) {
      res.json({
        success: false,
        message: "User not deleted.",
      });
    }
  }

  export {postApiUsers, getApiUsers, deleteApiUsers}