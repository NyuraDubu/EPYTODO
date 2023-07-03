const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../config/db.js');
var pool = db.initconnection();
const middleware = require('../../middleware/auth.js');
require('dotenv').config();

router.put('/:id', middleware.login, (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            pool.query(`UPDATE user SET firstname = ${pool.escape(req.body.firstname)}, name = ${pool.escape(req.body.name)}, email = ${pool.escape(req.body.email)}, password = ${pool.escape(hash)} WHERE id = ${pool.escape(req.params.id)};`, (err, result) => {
                if (err) {
                    return res.status(500).json({
                    error: err
                });
                } else {
                    pool.query(`SELECT * FROM user WHERE id = ${pool.escape(req.params.id)};`, (err, result) => {
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
                }
            });
        }
    });
});

router.delete('/:id', middleware.login, (req, res, next) => {
    pool.query(`DELETE FROM user WHERE id = ${pool.escape(req.params.id)};`, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            return res.status(200).json({
                msg: "Sucessfully deleted record number: " + req.params.id
            });
        }
    });
});

module.exports = router;

