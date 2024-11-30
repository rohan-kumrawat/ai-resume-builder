const User = require('../models/User');

exports.updateProfile = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;

      if (password) {
        user.password = password; // Ensure password is hashed
      }

      const updatedUser = await user.save();
      res.status(200).json({
        message: 'Profile updated',
        user: updatedUser,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
};
