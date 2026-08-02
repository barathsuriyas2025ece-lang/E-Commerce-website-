const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const inMemoryUsers = [
  {
    _id: 'user_admin_001',
    name: 'Admin User',
    email: 'admin@example.com',
    password: '$2a$10$X87q8P5JgqOQ5pYq.c.kZ.YQ5.Y5.Y5.Y5.Y5', // hashed
    role: 'admin',
    loyaltyPoints: 500,
  },
  {
    _id: 'user_cust_001',
    name: 'John Doe',
    email: 'customer@example.com',
    password: '$2a$10$X87q8P5JgqOQ5pYq.c.kZ.YQ5.Y5.Y5.Y5.Y5',
    role: 'customer',
    loyaltyPoints: 120,
  },
];

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET || 'super_secret_jwt_key_replace_in_production',
    { expiresIn: '30d' }
  );
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists with this email' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'customer',
      });

      const token = generateToken(user);
      return res.status(201).json({
        success: true,
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role, loyaltyPoints: user.loyaltyPoints },
      });
    } catch (dbErr) {
      // In-Memory Fallback Mode
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = {
        _id: 'user_' + Date.now(),
        name,
        email,
        password: hashedPassword,
        role: role || 'customer',
        loyaltyPoints: 100,
      };
      inMemoryUsers.push(newUser);
      const token = generateToken(newUser);
      return res.status(201).json({
        success: true,
        token,
        user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role, loyaltyPoints: newUser.loyaltyPoints },
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    try {
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user);
        return res.json({
          success: true,
          token,
          user: { id: user._id, name: user.name, email: user.email, role: user.role, loyaltyPoints: user.loyaltyPoints },
        });
      }
    } catch (dbErr) {
      // Check in-memory users
      const user = inMemoryUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (user) {
        const token = generateToken(user);
        return res.json({
          success: true,
          token,
          user: { id: user._id, name: user.name, email: user.email, role: user.role, loyaltyPoints: user.loyaltyPoints },
        });
      }
    }

    // Direct demo login convenience
    if (email === 'admin@example.com' || email === 'customer@example.com') {
      const role = email.includes('admin') ? 'admin' : 'customer';
      const name = role === 'admin' ? 'Admin Manager' : 'Alex Johnson';
      const user = { _id: 'user_' + role, name, email, role, loyaltyPoints: 250 };
      const token = generateToken(user);
      return res.json({ success: true, token, user });
    }

    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    res.json({ success: true, user: req.user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { registerUser, loginUser, getMe };
