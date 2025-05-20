import User from '../models/User.js';
import pkg from 'jsonwebtoken';
const { sign } = pkg;

const generateToken = (user) => {
  return sign(
    { userId: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export async function signup(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const userExists = await User.findOne({ username });  // <-- Corrected here
    if (userExists) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const user = new User({ username, password });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const user = await User.findOne({ username });  // <-- Corrected here
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
