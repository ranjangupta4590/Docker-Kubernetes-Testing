const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User schema
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const DataSchema = new mongoose.Schema({
  userEmail: String,
  content: String,
});

const User = mongoose.model('User', UserSchema);
const Data = mongoose.model('Data', DataSchema);

// Register (Optional)
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await User.create({ email, password: hash });
  res.send({ message: 'User registered' });
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send({ error: 'User not found' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).send({ error: 'Invalid password' });

  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  res.send({ token });
});

// Get dashboard data (protected route)
app.get('/dashboard', async (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userData = await Data.find({ userEmail: decoded.email });
    res.send(userData);
  } catch (err) {
    res.status(400).send({ error: 'Invalid token' });
  }
});

app.post('/data', async (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send({ error: 'No token provided' });
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const { content } = req.body;
      const newData = await Data.create({ userEmail: decoded.email, content });
      res.send(newData);
    } catch (err) {
      res.status(400).send({ error: 'Invalid token' });
    }
  });

app.get('/', (req, res) => {
    res.send('API is running...');
  });

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
