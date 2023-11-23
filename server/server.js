const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./authentication/authRoutes');

// Express app
const app = express(); 

app.use(cors({
    origin: true,
    credentials: true,
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
}));

mongoose.connect(
    'mongodb://127.0.0.1:27017/devquest',
    { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));
    
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    
    
    app.use(express.json());
    app.use('/', projectRoutes); 
    app.use('/auth', authRoutes);
    
    app.listen(process.env.PORT, () => {
        
        console.log('listening on port 4000!');    
    });
    

 