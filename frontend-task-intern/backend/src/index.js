const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const port = 5000;


connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));