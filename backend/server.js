const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'https://buddymate.space', // Replace with your frontend URL once set
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use('/uploads', express.static('uploads'));

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log('Created uploads directory');
}

// MongoDB Connection (Atlas only - use environment variable for security)
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://Rahul:wr0z1qqZr6U8H10N@cluster0.wj2io.mongodb.net/buddymate?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// File upload setup with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

// Buddy Schema
const buddySchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  location: { type: String, required: true },
  allowLocation: { type: Boolean, default: false },
  age: { type: Number, required: true },
  drinking: { type: String, required: true },
  smoking: { type: String, required: true },
  diet: { type: String, required: true },
  height: { type: String, required: true },
  bodyFeatures: { type: String },
  freeTime: { type: [String], required: true },
  availabilityType: { type: String, required: true },
  interests: { type: [String] },
  bio: { type: String },
  photo: { type: String, required: true },
});
const Buddy = mongoose.model('Buddy', buddySchema);

// Chat Schema
const chatSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});
const Chat = mongoose.model('Chat', chatSchema);

// Signup Route (Regular User)
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Signup Route (Buddy)
app.post('/signup-buddy', upload.single('photo'), async (req, res) => {
  console.log('Received signup-buddy request:', req.body);
  console.log('Uploaded file:', req.file);
  const {
    username, email, password, gender, location, allowLocation, age, drinking, smoking, diet,
    height, bodyFeatures, freeTime, availabilityType, interests, bio
  } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : '';

  if (!photo) {
    console.log('No photo uploaded');
    return res.status(400).json({ error: 'Photo is required' });
  }

  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const buddy = new Buddy({
      username, email, password: hashedPassword, gender, location, allowLocation: allowLocation === 'true',
      age: parseInt(age), drinking, smoking, diet, height, bodyFeatures,
      freeTime: JSON.parse(freeTime), availabilityType, interests: JSON.parse(interests), bio, photo
    });
    await buddy.save();
    console.log('Buddy saved:', buddy);
    res.status(201).json({ message: 'Buddy signed up successfully' });
  } catch (error) {
    console.error('Buddy signup error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Login Route (Regular User)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', { email, password });
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ error: 'User not found' });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch for:', email);
      return res.status(400).json({ error: 'Invalid password' });
    }
    console.log('Login successful for:', email);
    res.status(200).json({ message: 'Login successful', user: { username: user.username, email: user.email, gender: '', location: '', interests: [], photos: [] } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login Route (Buddy)
app.post('/login-buddy', async (req, res) => {
  const { email, password } = req.body;
  console.log('Buddy login attempt:', { email, password });
  try {
    const buddy = await Buddy.findOne({ email });
    if (!buddy) {
      console.log('Buddy not found:', email);
      return res.status(400).json({ error: 'Buddy not found' });
    }
    const isMatch = await bcryptjs.compare(password, buddy.password);
    if (!isMatch) {
      console.log('Password mismatch for Buddy:', email);
      return res.status(400).json({ error: 'Invalid password' });
    }
    console.log('Buddy login successful for:', email);
    res.status(200).json({ message: 'Login successful', user: buddy.toObject() });
  } catch (error) {
    console.error('Buddy login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Buddy by ID
app.get('/buddies/:id', async (req, res) => {
  try {
    const buddy = await Buddy.findById(req.params.id);
    if (!buddy) return res.status(404).json({ error: 'Buddy not found' });
    res.status(200).json(buddy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Buddies
app.get('/buddies', async (req, res) => {
  try {
    const buddies = await Buddy.find();
    res.status(200).json(buddies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Chat History
app.get('/chat/:user/:buddy', async (req, res) => {
  const { user, buddy } = req.params;
  console.log('Fetching chat for:', { user, buddy });
  try {
    const messages = await Chat.find({
      $or: [
        { from: user, to: buddy },
        { from: buddy, to: user },
      ],
    }).sort({ timestamp: 1 });
    console.log('Chat messages:', messages);
    res.status(200).json({ messages });
  } catch (error) {
    console.error('Chat fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Send Chat Message
app.post('/chat', async (req, res) => {
  const { from, to, message } = req.body;
  console.log('Saving message:', { from, to, message });
  try {
    const chat = new Chat({ from, to, message });
    await chat.save();
    console.log('Message saved:', chat);
    res.status(201).json({ message: 'Message sent' });
  } catch (error) {
    console.error('Chat save error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/buddies/:id', upload.single('photo'), async (req, res) => {
  const { id } = req.params;
  const {
    username, email, password, gender, location, allowLocation, age, drinking, smoking, diet,
    height, bodyFeatures, freeTime, availabilityType, interests, bio
  } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : undefined;

  try {
    const updateData = {
      username, email, gender, location, allowLocation: allowLocation === 'true',
      age: parseInt(age), drinking, smoking, diet, height, bodyFeatures,
      freeTime: JSON.parse(freeTime), availabilityType, interests: JSON.parse(interests), bio
    };
    if (password) updateData.password = await bcryptjs.hash(password, 10);
    if (photo) updateData.photo = photo;

    const buddy = await Buddy.findByIdAndUpdate(id, updateData, { new: true });
    if (!buddy) return res.status(404).json({ error: 'Buddy not found' });
    res.status(200).json({ message: 'Buddy updated', photo: buddy.photo });
  } catch (error) {
    console.error('Buddy update error:', error);
    res.status(400).json({ error: error.message });
  }
});

app.get('/inbox/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const messages = await Chat.find({ to: username }).sort({ timestamp: -1 });
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));