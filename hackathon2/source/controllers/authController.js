const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Received registration request:', { username, password });

    const userExists = await User.getUserByUsername(username);
    if (userExists) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.createUser(username, hashedPassword);

    console.log('User registered successfully:', newUser);

    res.status(201).json({ message: 'User registered successfully!', user: newUser });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: error.stack || 'Internal Server Error' });
  }
};

// handling user login
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.getUserByUsername(username);

    if (!user) {
      return res.status(401).json({ error: 'Invalid username' });
    }

    const passwordMatch = await bcrypt.compare(password, user.hashed_password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    req.session.userId = user.id;

    // redirect to account.html upon successful login
    res.status(200).json({ message: 'Logged in', username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// handling user logout
exports.logoutUser = (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: 'Logout successful' });
};

// generating a playlist
exports.generatePlaylist = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const category = req.params.category;

    // fetching user data from db
    const user = await User.getUserById(req.session.userId);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // simple placeholder for playlist generation logic
    const playlist = generatePlaylist(category);

    res.status(200).json({ playlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Export all functions
module.exports = exports;

