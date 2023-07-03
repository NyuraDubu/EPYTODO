const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../config/db.js');
var pool = db.initconnection();
const middleware = require('../../middleware/auth.js');
require('dotenv').config();

router.get('/', middleware.login, (req, res, next) => {
    pool.query(`SELECT * FROM todo`, (err, result) => {
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

router.get('/:id', middleware.login, (req, res, next) => {
    pool.query(`SELECT * FROM todo WHERE id = ${pool.escape(req.params.id)}`, (err, result) => {
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


module.exports = router;