const express = require('express');
const db = require('./accountsModel');
const { validateAccount, validateId } = require('./accountsMiddleware');

const router = express.Router();

router.post('/', validateAccount, (req, res) => {
    db.createAccount(req.account)
        .then(account => res.status(201).json(account))
        .catch(err => res.status(500).json({ error: err }));
});

router.get('/', (_, res) => {
    db.getAccounts()
        .then(accounts => res.status(200).json(accounts))
        .catch(err => res.status(500).json({ error: err }));
});

router.put('/:id', validateId, (req, res) => {
    db.updateAccount(req.params.id, {
        ...req.body,
        name: req.body.name,
        budget: req.body.budget
    })
    .then(changed => res.status(202).json(changed))
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

router.delete('/:id', validateId, (req, res) => {
    db.removeAccount(req.params.id)
        .then(deleted => res.status(201).json(deleted))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;