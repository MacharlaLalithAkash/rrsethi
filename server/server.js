const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

// MongoDB connection
mongoose.connect('mongodb://mongo:27017/yourdb', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(bodyParser.json());

// Define your Mongoose schema and model here
const tagSchema = new mongoose.Schema({
  name: String,
  rfidTags: [String],
});

const Tag = mongoose.model('Tag', tagSchema);

app.post('/api/save-data', async (req, res) => {
  try {
    const { name, rfidTags } = req.body;
    const newTag = new Tag({ name, rfidTags: rfidTags.split(',') });
    await newTag.save();
    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
