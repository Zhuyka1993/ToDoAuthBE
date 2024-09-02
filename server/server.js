const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // модель користувача
const cors = require('cors');
const homeRoutes = require('./routes/homeRoutes');

const app = express();
app.use(express.json());
app.use(cors()); // дозволяє запити з клієнтської частини

const PORT = process.env.PORT || 5001;
const JWT_SECRET = 'just_new_secret_key_very_important'; // замініть на свій секретний ключ

mongoose.connect('mongodb+srv://zhuyka1993:5195454q@cluster0.57bhd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Маршрут реєстрації
app.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Користувач з такою поштою вже існує.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name });

    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: user._id, name: user.name });
  } catch (err) {
    res.status(500).json({ message: 'Помилка сервера.' });
  }
});

//Маршрут головної сторінки:
app.use('/', homeRoutes);

// Маршрут авторизації
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Користувача не знайдено.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неправильний пароль.' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: user._id, name: user.name });
  } catch (err) {
    res.status(500).json({ message: 'Помилка сервера.' });
  }
});

// Підключення маршрутів для завдань
const taskRoutes = require('./routes/taskRoutes');
app.use('/api', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});