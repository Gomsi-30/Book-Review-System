// Placeholder for app.js

import express, { json } from 'express';
import { connect } from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; 

// MongoDB connect
dotenv.config();

const app = express();
app.use(json());

connectDB();

app.get('/path', (req, res) => {
  // yahan request handle karo
  res.send('Hello World');
});


app.use('/api', authRoutes);
app.use('/api', bookRoutes);
app.use('/api', reviewRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
