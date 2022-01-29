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

async function SuppliersList(req, res) {
    try {
        const suppliers = await knex('fornecedores')

        return res.status(200).json(suppliers);
    } catch ({ message }) {
        return res.status(400).json({
            message
        });
    };
};

async function SingleSupplier(req, res) {
    const { fornecedor_id } = req.user;

    try {
        let supplier = await knex('fornecedores')
            .where({ id: fornecedor_id })
            .first();

        const countCustomers = await knex('fornecedores')
            .count('fornecedores.nome')
            .leftJoin('usuarios', 'usuarios.fornecedor_id', 'fornecedores.id')
            .where('fornecedores.id', fornecedor_id)
            .first();

        supplier = await knex('fornecedores')
            .update({ total_clientes: countCustomers.count })
            .where({ id: fornecedor_id })
            .returning('*');

        return res.status(200).json({
            supplier: supplier[0]
        });
    } catch ({ message }) {
        return res.status(400).json({
            message
        });
    };
};


module.exports = {
    CreateSupplier,
    SuppliersList,
    SingleSupplier
};