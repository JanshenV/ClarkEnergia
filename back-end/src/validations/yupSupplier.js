const yup = require('./yup');

const yupCreateSupplier = yup.object().shape({
    nome: yup.string().required(),
    logo: yup.string().required(),
    estado_origem: yup.string().min(2).max(2).required(),
    preco_kwh: yup.number().required(),
    min_kwh: yup.number().required(),
    total_clientes: yup.number(),
    avaliacao_media: yup.number()
});

module.exports = { yupCreateSupplier }