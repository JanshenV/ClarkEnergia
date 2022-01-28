const knex = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const findEmail = require('../validations/findEmail');

const {
    yupCreateUser,
    yupEditUser,
    yupUserLogin
} = require('../validations/yupUsers');


async function CreateUser(req, res) {
    let {
        nome,
        email,
        senha
    } = req.body;

    try {
        await yupCreateUser.validate(req.body);

        email = email.toLowerCase();
        const existingEmail = await findEmail(email);
        if (existingEmail) return res.status(400).json({
            message: 'Email já em uso por outro usuário.'
        });

        const encryptPassword = await bcrypt.hash(String(senha), 10);

        const newUserData = {
            nome,
            email,
            senha: encryptPassword
        };

        await knex('usuarios')
            .insert(newUserData);

        return res.status(201).json({
            message: 'Cadastro realizado.'
        });

    } catch ({ message }) {
        res.status(400).json({
            message
        });
    };
};

async function EditUser(req, res) {
    let {
        nome,
        email,
        senha,
        energia_mensal
    } = req.body;
    const { id } = req.user;

    const reqBodyItems = Object.keys(req.body).length;
    if (reqBodyItems === 0) {
        return res.status(400).json({
            message: 'Ao menos um item é necessário para edição de usuário.'
        });
    };

    try {
        await yupEditUser.validate(req.body);

        let user = await knex('usuarios')
            .where({ id })
            .first();

        if (email && email !== user.email) {
            email = email.toLowerCase();
            const existingEmail = await findEmail(email);
            if (existingEmail) return res.status(400).json({
                message: 'Email já em uso por outro usuário.'
            });
        };

        if (senha) {
            const encryptPassword = await bcrypt.hash(String(senha), 10);
            senha = encryptPassword;
        };

        const newUserData = {
            nome: nome ? nome : user.nome,
            email: email ? email : user.email,
            senha: senha ? senha : user.senha,
            energia_mensal: energia_mensal ? Number(energia_mensal) : user.energia_mensal
        };

        user = await knex('usuarios')
            .where({ id })
            .update(newUserData)
            .returning('*');

        return res.status(200).json({
            user: user[0]
        });

    } catch ({ message }) {
        return res.status(400).json({
            message
        });
    };
};

async function DeleteUser(req, res) {
    const { id } = req.user;
    const { senha } = req.body;

    if (!senha || String(senha).length < 6) return res.status(403).json({
        message: 'Insira senha válida para deletar usuário.'
    });

    try {
        const user = await knex('usuarios')
            .where({ id })
            .first();

        const comparePassword = await bcrypt.compare(String(senha), user.senha);
        if (!comparePassword) return res.status(403).json({
            message: 'Insira senha válida para deletar usuário.'
        });

        await knex('usuarios')
            .where({ id: user.id })
            .del();

        return res.status(200).json({
            message: 'Usuário removido.'
        });
    } catch ({ message }) {
        return res.status(400).json({
            message
        });
    };
};

async function UserLogin(req, res) {
    let {
        email,
        senha
    } = req.body;

    try {
        await yupUserLogin.validate(req.body);

        email = email.toLowerCase();
        const user = await findEmail(email);
        if (!user) return res.status(404).json({
            message: 'Email ou senha não conferem.'
        });

        const passwordCompare = await bcrypt.compare(String(senha), user.senha);
        if (!passwordCompare) return res.status(404).json({
            message: 'Email ou senha não conferem.'
        });

        const token = jwt.sign({ id: user.id },
            process.env.SECRET_JWT
        );

        return res.status(200).json({ token });

    } catch ({ message }) {
        return res.status(400).json({
            message
        });
    };
};

async function UserProfile(req, res) {
    const user = req.user;
    return res.status(200).json({ user });
};

async function ListOfUsers(req, res) {
    try {
        const users = await knex('usuarios');
        const usersWithoutPassword = []

        for (const user of users) {
            const { senha: _, ...userData } = user;
            usersWithoutPassword.push(userData);
        };

        return res.status(200).json(usersWithoutPassword);
    } catch ({ message }) {
        return res.status(400).json({
            message
        });
    };
};

async function SingleUser(req, res) {
    const { id } = req.params;

    if (!id) return res.status(404).json({
        message: 'ID obrigatório.'
    });

    try {
        let singleUser = await knex('usuarios')
            .where({ id })
            .first();

        if (!singleUser) return res.status(404).json({
            message: 'Usuário não encontrado.'
        });

        const { senha: _, ...userData } = singleUser;
        singleUser = userData

        return res.status(200).json(singleUser);
    } catch ({ message }) {
        return res.status(400).json({
            message
        });
    };
};


module.exports = {
    CreateUser,
    EditUser,
    UserLogin,
    UserProfile,
    ListOfUsers,
    SingleUser,
    DeleteUser
};