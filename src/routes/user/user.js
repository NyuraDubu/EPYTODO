const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../config/db.js');
var pool = db.initconnection();
const middleware = require('../../middleware/auth.js');
require('dotenv').config();

router.get('/:id', middleware.login, (req, res, next) => {
    var id = req.params.id;
    if (id.indexOf("@") > -1) {
        pool.query(`SELECT * FROM user WHERE email = ${pool.escape(id)}`, (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            } else {
                return res.status(200).json(
                    result[0]
                );
            }
        }
        );
    }
    else {
        pool.query(`SELECT * FROM user WHERE id = ${pool.escape(id)}`, (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            } else {
                return res.status(200).json(
                    result[0]
                );
            }
        }
        );
    }

});

module.exports = router;