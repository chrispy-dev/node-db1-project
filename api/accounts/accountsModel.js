const db = require('../../data/dbConfig');

const getAccounts = () => {
    return db('accounts');
};

const getAccount = (id) => {
    return db('accounts')
        .where({ id: id })
        .first();
};

const createAccount = (account) => {
    return db('accounts')
        .insert(account);
};

const updateAccount = (id, changes) => {
    return db('accounts')
        .where({ id: id })
        .update(changes);
};

const removeAccount = (id) => {
    return db('accounts')
        .where({ id: id })
        .del();
};

module.exports = {
    getAccounts,
    getAccount,
    createAccount,
    updateAccount,
    removeAccount
}