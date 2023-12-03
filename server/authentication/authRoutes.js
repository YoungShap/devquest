const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
require('dotenv').config();
const User = require('./userModel');
const authGuard = require('./auth-guard');
const router = express.Router();

const getUser = (req, res) => {
    if (!req.headers.authorization) {
        return null;
    }

    const data = jwt.decode(req.headers.authorization, process.env.JWT_SECRET);

    if (!data) {
        return res.status(401).send("User is not authorized");
    }

    return data.user;
}

// Login status
router.get('/login', authGuard, async (req, res) => {
    const user = getUser(req, res);

    res.send(user);
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

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
    // יצירת טוקן
    userResult.token = jwt.sign({ user: userResult }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.send(userResult);
});

router.post('/signup', async (req, res) => {
    const { type, firstName, lastName, email, devName, password } = req.body;

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

router.put("/users/:id", async (req, res) => {
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

module.exports = router; 