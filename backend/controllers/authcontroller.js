const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'mysecretkey'; 

const RegisterUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({
            email: req.body.email
        });

        if (existingUser) {
            return res.status(409).json({
                message: 'Email already registered'
            });
        }

        const hashedPassword = await bcrypt.hash(
            req.body.password,
            10
        );

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            college: req.body.college,
            department: req.body.department,
            cgpa: req.body.cgpa,
            graduationYear: req.body.graduationYear,
            phoneNumber: req.body.phoneNumber
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const LoginUser = async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });

        if (!user) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const isMatch = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    RegisterUser,
    LoginUser
};