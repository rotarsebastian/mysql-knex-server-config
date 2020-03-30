const express = require('express');
const app = express();
// const path = require('path');

// app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
 
// parse application/json
app.use(express.json());

// Setup the DB
const { Model } = require('objection');
const Knex = require('knex');

const knexFile = require('./knexfile');
const knex = Knex(knexFile.development);

// Give the knex instance to objection.
Model.knex(knex);

const usersRoute = require('./routes/users');

app.use('/users', usersRoute);

const User = require('./models/User');

const PORT = process.env.PORT || 9090;

// #############################################
app.listen(PORT, (err, res) => {
    return err ? console.log('Server error') : console.log('Server listening on port ' + PORT);
});
