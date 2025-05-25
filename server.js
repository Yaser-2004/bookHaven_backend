import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import env from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';
import bookRoutes from './routes/bookRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';


const app = express();
const port = 5001;

app.use(express.json());
const allowedOrigins = [
    'http://localhost:8080',
    'https://book-haven-frontend-beige.vercel.app/'
  ];
  
app.use(cors({
origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
    callback(null, true);
    } else {
    callback(new Error('Not allowed by CORS'));
    }
},
credentials: true
}));
env.config();

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log("Mongo connection error --->", err));


app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
// Protected test route
app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: `Hello user ${req.user.id}, role: ${req.user.role}` });
});


app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})

//yasersiddiquee
//4rVUgkowsjBD5enE


