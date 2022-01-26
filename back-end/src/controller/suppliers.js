const knex = require('../database/connection');
const { yupCreateSupplier } = require('../validations/yupSupplier');


async function CreateSupplier(req, res) {
    const {
        nome,
        logo,
        estado_origem,
        preco_kwh,
        min_kwh,
        total_clientes,
        avaliacao_media
    } = req.body;

    try {
        await yupCreateSupplier.validate(req.body);

        const existingNome = await knex('fornecedores')
            .where({ nome })
            .first();

        const existingLogo = await knex('fornecedores')
            .where({ logo })
            .first();

        if (existingNome) return res.status(400).json({
            message: `${nome} já está sendo utilizado por outro fornecedor.`
        });

        if (existingLogo) return res.status(400).json({
            message: 'Logo já está sendo utilizado por outro fornecedor.'
        });

        await knex('fornecedores')
            .insert(req.body);

        return res.status(201).json();
    } catch ({ message }) {
        return res.status(400).json({
            message
        });
    };
};

module.exports = { CreateSupplier }