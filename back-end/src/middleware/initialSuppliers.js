const knex = require('../database/connection');


async function InitialSuppliers(req, res, next) {
    try {
        const suppliers = [{
                nome: 'A fornecedor',
                logo: 'https://img.elo7.com.br/product/original/24BB7FF/plaquinha-palavras-cruzadas-letra-a-familia.jpg',
                estado_origem: 'BA',
                preco_kwh: 0.60,
                min_kwh: 100,
                total_clientes: 0,
                avaliacao_media: 0
            },
            {
                nome: 'B fornece',
                logo: 'https://img.elo7.com.br/product/original/24BD26A/plaquinha-palavras-cruzadas-letra-b-parede.jpg',
                estado_origem: 'MG',
                preco_kwh: 0.80,
                min_kwh: 200,
                total_clientes: 0,
                avaliacao_media: 0
            },
            {
                nome: 'C supply',
                logo: 'https://cdn.leroymerlin.com.br/products/letra_c_4cm_acrilico_preto_kami_acrilicos_89622743_0001_600x600.jpg',
                estado_origem: 'SP',
                preco_kwh: 2.80,
                min_kwh: 300,
                total_clientes: 0,
                avaliacao_media: 0
            }
        ];

        for (const supplier of suppliers) {
            const existingNome = await knex('fornecedores')
                .where({ nome: supplier.nome })
                .first();

            if (existingNome) return next();

            await knex('fornecedores')
                .insert(supplier);
        };

        return next();
    } catch ({ message }) {
        return res.status(400).json({
            message
        });
    };
};

module.exports = { InitialSuppliers }