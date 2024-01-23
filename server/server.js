const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');
const logger = require("./logger/loggerService");


// Express app
const app = express(); 
app.use(logger);

app.use(cors({
    origin: true,
    credentials: true,
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
}));

mongoose.connect(
    process.env.MONGO_URI,
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
    

 