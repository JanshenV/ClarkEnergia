drop table if exists clarkedb;
create database clarkedb;

create table fornecedores(
    id serial primary key,
    nome text not null unique,
    logo bytea not null unique,
    estado_origem text not null,
    preco_kwh real not null,
    min_kwh real not null,
    total_clientes int,
    avaliacao_media real 
);

create table usuarios(
    id serial primary key,
    fornecedor_id int,
    nome text not null,
    email text not null unique,
    senha text not null,
    energia_mensal real,
    foreign key(fornecedor_id) references fornecedores(id)
);
