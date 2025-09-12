const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectMongoDB } = require('./config/db_mongo'); 
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
const app = express();

connectMongoDB(); 
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());

app.get('/', (req, res) => res.send('API is running...'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/tasks', require('./routes/tasks'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));