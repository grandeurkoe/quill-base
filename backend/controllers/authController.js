const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    try {
        await db.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashed]);
        res.status(201).json({ message: 'Registered successfully' });
    } catch (err) {
        res.status(400).json({ message: 'User already exists' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (!users.length) return res.status(400).json({ message: 'Invalid email' });

    const user = users[0];
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid) return res.status(400).json({ message: 'Wrong password' });

    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

