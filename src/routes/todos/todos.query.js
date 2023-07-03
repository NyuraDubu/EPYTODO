const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../config/db.js');
var pool = db.initconnection();
const middleware = require('../../middleware/auth.js');
require('dotenv').config();

router.post('/', middleware.login, (req, res, next) => {
    pool.query(`INSERT INTO todo (title, description, status, user_id, due_time) VALUES (${pool.escape(req.body.title)}, ${pool.escape(req.body.description)}, ${pool.escape(req.body.status)}, ${pool.escape(req.body.user_id)}, ${pool.escape(req.body.due_time)});`, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            pool.query(`SELECT * FROM todo WHERE id = ${pool.escape(result.insertId)}`, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }
                else {
                    return res.status(200).json(
                        result[0]
                    );
                }
            });
        }
    });
});

router.put('/:id', middleware.login, (req, res, next) => {
    pool.query(`UPDATE todo SET title = ${pool.escape(req.body.title)}, description = ${pool.escape(req.body.description)}, status = ${pool.escape(req.body.status)}, user_id = ${pool.escape(req.body.user_id)}, due_time = ${pool.escape(req.body.due_time)} WHERE id = ${pool.escape(req.params.id)}`, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            pool.query(`SELECT * FROM todo WHERE id = ${pool.escape(req.params.id)}`, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }
                else {
                    return res.status(200).json(
                        result[0]
                    );
                }
            });
        }
    });
});

router.delete('/:id', middleware.login, (req, res, next) => {
    pool.query(`DELETE FROM todo WHERE id = ${pool.escape(req.params.id)}`, (err, result) => {
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