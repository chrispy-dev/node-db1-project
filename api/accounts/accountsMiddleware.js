const { getAccount } = require('./accountsModel');

const validateAccount = (req, res, next) => {
    const { name, budget } = req.body;

    if (name && budget) {
        req.account = { name: name, budget: budget };
        next();
    } else {
        res.status(400).json({ error: "Name and Budget are required for creating account." });
    };
};

const validateId = (req, res, next) => {
    const { id } = req.params;

    getAccount(id)
        .then(account => {
            if(account) {
                req.account = account;
                next();
            } else {
                res.status(404).json({ error: "Could not find account with that ID." });
            };
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

module.exports = {
    validateAccount,
    validateId
}