const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/api/accounts', (req, res) => {
    db('accounts')
        .then(accounts => res.status(200).json(accounts))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Error retrieving accounts." });
        });
});

server.get('/api/accounts/:id', (req, res) => {
    const { id } = req.params;

    db('accounts').where({ id: id })
        .then(account => res.status(200).json(account[0]))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Error retrieving account by ID." });
        });
});

server.post('/api/accounts', (req, res) => {
    const { name, budget } = req.body;

    db('accounts').insert({ name: name, budget: budget })
        .then(id => res.status(201).json(id))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Error creating account." });
        });
});

server.put('/api/accounts/:id', (req, res) => {
    const { id } = req.params;
    const { name, budget } = req.body;

    db('accounts').where({ id: id }).update({ name: name, budget: budget })
        .then(updated => res.status(204).json(updated))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Error updating account." });
        });
});

server.delete('/api/accounts/:id', (req, res) => {
    const { id } = req.params;
    
    db('accounts').where({ id: id }).del()
        .then(deleted => res.status(202).json(deleted))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Error deleting account." });
        });
});

module.exports = server;
