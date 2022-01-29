const yup = require('./yup');

const yupCreateUser = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().email().required(),
    senha: yup.string().min(6).required()
});

const yupEditUser = yup.object().shape({
    nome: yup.string(),
    email: yup.string().email(),
    senha: yup.string().min(6)
});

const yupUserLogin = yup.object().shape({
    email: yup.string().email().required(),
    senha: yup.string().min(6).required()
});

module.exports = {
    yupCreateUser,
    yupEditUser,
    yupUserLogin
};