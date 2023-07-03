const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../config/db.js');
var pool = db.initconnection();
const middleware = require('../../middleware/auth.js');
require('dotenv').config();

router.post('/register', middleware.registration, (req, res, next) => {
    pool.query(`SELECT * FROM user WHERE email = ${pool.escape(req.body.email)}`, (err, result) => {
        if (result.length) {
            return res.status(400).json({
                msg: 'Account already exists'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    pool.query(`INSERT INTO user (email, password, firstname, name) VALUES (${pool.escape(req.body.email)}, ${pool.escape(hash)}, ${pool.escape(req.body.firstname)}, ${pool.escape(req.body.name)});`, (err, results) => {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            });
                        } else {
                            const logintoken = jwt.sign({
                                email: req.body.email,
                                id: results.insertId
                            }, process.env.SECRET, {
                                expiresIn: '1h'
                            });
                            return res.status(201).json({
                                token: logintoken
                            });
                        }
                    });
                }
            });
        }
    });
});

router.post('/login', (req, res, next) => {
    pool.query(`SELECT * FROM user WHERE email = ${pool.escape(req.body.email)};`, (err, results) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else if (!results.length) {
            return res.status(400).json({
                msg: 'Invalid Credentials'
            });
        } else {
            bcrypt.compare(req.body.password, results[0]['password'], (err, result) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    if (result) {
                        const token = jwt.sign({
                            email: results[0].email,
                            userId: results[0].id
                        }, process.env.SECRET, { expiresIn: '1h' });
                        return res.status(200).json({
                            token: token,
                        });
                    } else {
                        return res.status(400).json({
                            msg: 'Invalid Credentials'
                        });
                    }

                }

            });
        }   
    });
});

router.get('/user', middleware.login, (req, res, next) => {
    pool.query(`SELECT * FROM user WHERE id = ${pool.escape(req.userData.id)};`, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            return res.status(200).json(
                result[0]
            );
        }
    });
});

router.get('/user/todos', middleware.login, (req, res, next) => {
    pool.query(`SELECT * FROM todo WHERE user_id = ${pool.escape(req.userData.id)};`, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            return res.status(200).json(
                result
            );
        }
    });
});


module.exports = router;