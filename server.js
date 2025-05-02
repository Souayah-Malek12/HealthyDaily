const express = require('express');
const {connectDb} = require("./Config/dbConfig");
const { registreController, loginController } = require('./Controllers/authController');
const app = express();
const PORT = 3100;
require('dotenv').config();
const cors = require("cors")
require('./utils/Cron');

app.use(cors())
app.use(express.json());


connectDb();
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  
app.get('/', (req, res) => {
  res.send('Hello hackathon!');
});

app.use('/auth', require('./Routes/authRoutes'));
app.use('/user', require('./Routes/userRoutes'));
app.use('/cals', require('./Routes/caloriesRoutes'));



