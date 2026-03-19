// Import User model
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// ================= REGISTER FUNCTION =================
exports.register = async (req, res) => {
  try {
    // Get data from request body
    const { name, email, password, role } = req.body;

    // Encrypt password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user document
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    // Send created user as response
    res.status(201).json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= LOGIN FUNCTION =================
exports.login = async (req, res) => {
  try {
    // Get login details
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid password" });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.status(200).json({ token, user });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= GET ALL USERS =================
exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users from database
    const users = await User.find();

    // Send users as response
    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET SINGLE USER =================
exports.getUserById = async (req, res) => {
  try {
    // Get user id from URL params
    const { id } = req.params;

    // Find user by id and exclude password
    const user = await User.findById(id).select('-password');

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= UPDATE USER =================
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Get updated data from body
    const { name, email, role } = req.body;

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, role },
      { new: true } // return updated document
    ).select('-password');

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json(updatedUser);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= DELETE USER =================
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
