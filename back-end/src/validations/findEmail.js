const knex = require('../database/connection');

async function FindEmail(email) {
    try {
        let existingEmail = await knex('usuarios')
            .where({ email })
            .first();
        if (existingEmail) return existingEmail;

        return existingEmail = false;

    } catch ({ message }) {
        return message
    };
};

module.exports = FindEmail;