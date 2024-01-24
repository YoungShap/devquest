const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
require('dotenv').config();
const User = require('../models/userModel');
const authGuard = require('../authentication/auth-guard');
const adminGuard = require('../authentication/adminGuard');
const { loginSchema, signupSchema, editAccSchema } = require('../config');
const router = express.Router();
const transporter = require("../emailService");
const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./scratch"); 

const getUserId = (req, res) => {
    if (!req.headers.authorization) {
        return null;
    }
    const data = jwt.decode(req.headers.authorization, process.env.JWT_SECRET);

    if (!data) {
        return res.status(401).send("User is not authorized");
    }

    return data.id;
};


// Login status
router.get('/login', authGuard, async (req, res) => {
    const _id = getUserId(req, res);

    try {
        const LoggedUser = await User.findOne({ _id });

        if (!LoggedUser) {
            return res.status(403).send("username or password is incorrect");
        }

        delete LoggedUser.password;
        delete LoggedUser.email;

        res.send(LoggedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//login (POST)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const schema = loginSchema.validate(req.body, { allowUnknown: true });

    if (schema.error) {
        return res.status(403).send(schema.error.details[0].message);
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(403).send("username or password is incorrect");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(403).send("username or password is incorrect");
    }

    // יצירת אובייקט רגיל מהמחלקה של היוזר 
    const userResult = user.toObject();
    // מחיקת הסיסמה מהאובייקט שנשלח למשתמש
    delete userResult.password;
    // delete userResult.email;
    // יצירת טוקן
    userResult.token = jwt.sign({ id: userResult._id, type: userResult.type }, process.env.JWT_SECRET, { expiresIn: '4h' });

    res.send(userResult);
});

router.post('/signup', async (req, res) => {
    const { type, firstName, lastName, email, devName, password } = req.body;
    const schema = signupSchema.validate(req.body, { allowUnknown: true });

    if (schema.error) {
        return res.status(403).send(schema.error.details[0].message);
    }

    const existingUser = await User.findOne({ $or: [{ email }, { devName }] });

    if (existingUser) {
        const errorField = existingUser.email === email ? 'Email' : 'DevName';
        return res.status(400).json({ error: `${errorField} already in use` });
    }

    const allowedTypes = ['Dev', 'Admin'];
    const userType = allowedTypes.includes(type) ? type : 'Dev';

    const user = new User({
        type: userType,
        firstName,
        lastName,
        email,
        devName,
        password: await bcrypt.hash(password, 10),
        favorites: [],
    });

    // הוספת המשתמש לדטה בייס
    const newUser = await user.save();
    // מחקנו את הסיסמה מהאובייקט שמחזירים ללקוח
    delete newUser.password;

    // החזרת המתשמש החדש ליוזר
    res.send(newUser);
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
});


// GET all users
router.get("/users", adminGuard, async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).send("Error retrieving users")
    }
})

//DELETE a User
router.delete('/users/:id', adminGuard, async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id });
        res.send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// favorites
router.put("/users/:id", authGuard, async (req, res) => {
    try {
        const { favorites } = req.body
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(404).send('User not found!');
        }
        user.favorites = favorites;

        await user.save();

        const updatedUserInfo = { favorites: user.favorites };
        res.json(updatedUserInfo);
    }
    catch {
        console.error('error');
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// GET 1 user
router.get("/users/:id", adminGuard, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });

        if (!user) {
            return res.status(404).send("User not found!");
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
//EDIT(PUT) user
router.put('/users/edit/:id', authGuard, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });
        const { firstName, lastName, devName, email, } = req.body;
        const schema = editAccSchema.validate(req.body, { allowUnknown: true });

        if (schema.error) {
            return res.status(403).send(schema.error.details[0].message);
        }

        if (!user) {
            return res.status(404).send("Project not found!");
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.devName = devName;
        user.email = email;


        await user.save();

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Change Password 
router.put("/users/password/:id", authGuard, async (req, res) => {
    const { password, newPassword } = req.body;

    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });

        if (!user) {
            return res.status(403).send("User not found");
        }

        // Compare the provided current password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(403).send("Current password is incorrect");
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password with the new hashed password
        user.password = hashedNewPassword;

        // Save the updated user in the database
        await user.save();

        res.send("Password updated successfully");
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).send("Internal server error");
    }
});

router.put('/admin/users/:id', adminGuard, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });
        const { firstName, lastName, password, devName, email, type } = req.body;
        const schema = signupSchema.validate(req.body, { allowUnknown: true });

        if (schema.error) {
            return res.status(403).send(schema.error.details[0].message);
        }

        if (!user) {
            return res.status(404).send("Project not found!");
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.password = await bcrypt.hash(password, 10);
        user.devName = devName;
        user.email = email;
        user.type = type;


        await user.save();

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//send email to reset password
router.post("/forgotpassword", async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.send(
            "If your email is registered, you will receive a password reset link."
        );
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_FORGOT_PASSWORD, {
        expiresIn: "1h",
    });
   
    localStorage.setItem("authToken", token);

    // Use the transporter to send an email
    const resetUrl = `http://localhost:3000/passwordreset?token=${token}`;

    const mailOptions = {
        from: "thedevquest@hotmail.com",
        to: user.email,
        subject: "Password Reset",
        html: `<p>You requested a password reset</p><p>Click this <a href="${resetUrl}">link</a> to set a new password.</p>`,
    };

    try { 
        await transporter.sendMail(mailOptions);
        res.send("Password reset link has been sent to your email.");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Error in sending password reset link");
    }
});
//reset (PUT) user password 
router.put("/resetpassword", async (req, res) => {
    const { token, resetPassword } = req.body;
  
    if (!token || !resetPassword) {
      return res.status(400).send("Token and new password are required.");
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_FORGOT_PASSWORD); 
      const userId = decoded.id;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found.");
      }
  
      const storedToken = localStorage.getItem("authToken");
  
      // Check if the token has expired
      if (storedToken !== token) {
        return res.status(400).send("Token is invalid.");
      }
  
      if (user.tokenExpiration < Date.now()) {
        return res.status(400).send("Token has expired.");
      }
  
      user.password = await bcrypt.hash(resetPassword, 10); 
      user.token = undefined; // Clear the reset token
      user.tokenExpiration = undefined; // Clear the token expiration
      await user.save();
  
      return res.send("Password has been successfully reset.");
    } catch (error) {
      console.error("Reset password error:", error);
      return res.status(500).send("Error resetting password.");
    }
  });


module.exports = router;  