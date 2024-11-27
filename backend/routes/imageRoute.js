const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const User = require('../models/User'); // Update with your User model path

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Create user route
app.post('/api/users', async (req, res) => {
    try {
        const { username, userEmail, userPassword } = req.body;

        const newUser = new User({
            username,
            userEmail,
            userPassword,
            profileImage: 'uploads/default.jpg' // Path to the default image
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update user route with image upload
app.put('/api/users/:id', upload.single('profileImage'), async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (req.file) {
            updates.profileImage = `uploads/${req.file.filename}`;
        }

        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
