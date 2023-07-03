const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const bodyParser = require('body-parser');
const routes = require('./routes/auth/auth.js');
const userroutes = require('./routes/user/user.js');
const userqueries = require('./routes/user/user.query.js');
const todos = require('./routes/todos/todos.js');
const todosqueries = require('./routes/todos/todos.query.js');
const db = require('./config/db.js');

db.initconnection();

app.use(bodyParser.json());
app.use('/', routes);
app.use('/users', userroutes);
app.use('/users', userqueries);
app.use('/todos', todos);
app.use('/todos', todosqueries);
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server is running on port ` + port);
});
