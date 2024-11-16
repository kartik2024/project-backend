const express = require('express');
const { User } = require('../models/user');
const { Query } = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');




router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if(user){
        return res.status(400).json({
            message: 'User already exists'
        })
    }

    const createdUser = await User.create({
        username: username,
        password: password
    });

    const userId = createdUser._id;

    const token = jwt.sign({
        userId
    }, "KartikSharma")

    res.status(201).json({
        message: "User created successfully",
        token
    })
});

router.post('/signin', async(req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if(!user || password !== user.password){
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({
        userId: user._id,
    }, "KartikSharma")

    res.status(201).json({
        message: "User signed in successfully",
        token
    })
})

router.post('/convert', async(req, res) => {
    const token = req.headers.authorization;

    if(!token){
        return res.status(403).json({
            message: "You are not signed in"
        });
    }

    const decoded = jwt.verify(token, "KartikSharma");

    if(!decoded){
        return res.status(403).json({
            message: "You are not signed in"
        });
    }

    const amount = req.body.amount;
    const fromCurrency = req.body.fromCurrency;
    const toCurrency = req.body.toCurrency;
    const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/${fromCurrency}.json`)

    const data = await response.json();
    const rate = data[`${fromCurrency}`][`${toCurrency}`];

    const convertedAmount = amount * rate;


    res.json({
        convertedAmount
    })
})

router.post('/contact', async (req, res) => {
    const token = req.headers.authorization;
    const email = req.body.email;
    const message = req.body.message;

    if(!token){
        return res.status(403).json({
            message: "You are not signed in"
        });
    }

    const decoded = jwt.verify(token, "KartikSharma");

    if(!decoded){
        return res.status(403).json({
            message: "You are not signed in"
        });
    }


    await Query.create({
        email,
        message
    })

    res.json({
        message: "Your query has been submitted."
    })

})

module.exports = router;