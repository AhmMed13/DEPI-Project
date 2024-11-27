const express = require("express");
const Router = express.Router();
const multer = require("multer");
const path = require("path");
const User = require("../models/User"); 

// Setup for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../Images")); // Folder where images will be saved
    },
    filename: (req, file, cb) => {
        const uniqueFilename = new Date().toISOString().replace(/:/g, "-") + file.originalname;
        cb(null, uniqueFilename); // Save the file with a unique name
    }
});

const upload = multer({ storage });

Router.put("/:id", upload.single("Images"), async (req, res) => {
    try {
        const userId = req.params.id;
        const { Username, UserEmail, UserCountry, UserPhoneNumber, UserGender } = req.body;

        // Create an object to hold the updated fields
        const updateData = {};

        // If a new image is uploaded, add the relative image path to the update data
        if (req.file) {
            updateData.userImage = `/Images/${req.file.filename}`; // Only save the relative path
        }

        // Update user in the database
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, data: "User not found" });
        }

        res.status(200).json({ success: true, data: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, data: "Error updating profile" });
    }
});




module.exports = Router;
