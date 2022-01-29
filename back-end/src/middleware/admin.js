const knex = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const findEmail = require('../validations/findEmail');

async function CreateAdmin(req, res, next) {
    try {
        const email = 'clarkadmin@email.com';

        const existingAdmin = await findEmail(email);
        if (existingAdmin) return next();

        const encryptPassword = await bcrypt.hash('clarkadmin123456', 10);

        const adminData = {
            nome: 'Clarke Admin',
            email,
            senha: encryptPassword
        };

        await knex('usuarios')
            .insert(adminData);

        next();
    } catch ({ message }) {
        return res.status(400).json({
            message
        });
    };
};

async function AdminToken(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) return res.status(403).json({
        message: 'Não autorizado.'
    });

    try {
        const token = authorization.replace('Bearer ', '').trim();
        const { id } = jwt.verify(token, process.env.SECRET_JWT);

        const adminUser = await knex('usuarios')
            .where({ id })
            .first();

        if (adminUser.email !== 'clarkadmin@email.com') return res.status(403).json({
            message: 'Não autorizado'
        });

        const { senha: _, ...adminData } = adminUser;
        req.user = adminData;

        next();
    } catch ({ message }) {
        return res.status(400).json({
            message
        });
    };
};

module.exports = {
    CreateAdmin,
    AdminToken
};