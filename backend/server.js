import express from 'express';
import mongoose from 'mongoose';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});




mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB with Mongoose'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Define a Task schema
const taskSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

// Create a Task model
const Task = mongoose.model('Task', taskSchema);

// Quotes list (stays local)
const quotes = [
  'You can do it!',
  'Keep going, you’re awesome!',
  'Every step counts!',
  'Believe in yourself!',
];


app.get('/api/quote', (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  res.json({ quote: randomQuote });
});


app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Couldn’t get tasks' });
  }
});


app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = new Task({
      id: Date.now(),
      text: req.body.text,
      completed: false,
    });
    await newTask.save();
    res.json(newTask);
    console.log(newTask);
    
  } catch (err) {
    res.status(500).json({ error: 'Couldn’t add task' });
  }
});


app.put('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findOne({ id: req.params.id });
    if (task) {
      task.completed = !task.completed;
      await task.save();
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Couldn’t toggle task' });
  }
});


app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const result = await Task.deleteOne({ id: req.params.id });
    if (result.deletedCount === 1) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Couldn’t delete task' });
  }
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});