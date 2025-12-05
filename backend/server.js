import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import quizRoutes from './routes/quiz.js';


const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json({
        message: 'Backend is working correctly',
        timeStamp: new Date().toISOString()
    })
});

app.use('/api/quiz', quizRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
});