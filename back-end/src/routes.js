const express = require('express');
const routes = express();

const {
    CreateUser,
    EditUser,
    UserLogin,
    UserProfile,
    ListOfUsers,
    SingleUser,
    DeleteUser
} = require('./controller/users');

const {
    CreateSupplier,
    SuppliersList,
    SingleSupplier,
    EditSupplier
} = require('./controller/suppliers');

const {
    VerifyToken
} = require('./middleware/verifyToken');

const {
    AdminToken,
    CreateAdmin
} = require('./middleware/admin');

const {
    InitialSuppliers
} = require('./middleware/initialSuppliers');

//CRUD 
routes.use(InitialSuppliers);
routes.use(CreateAdmin);
routes.post('/users', CreateUser);
routes.post('/users/login', UserLogin);

routes.use(VerifyToken);
routes.get('/users/profile', UserProfile);
routes.put('/users', EditUser);
routes.delete('/users', DeleteUser);
routes.get('/suppliers', SuppliersList);
routes.get('/suppliers/mysupplier', SingleSupplier);
routes.put('/suppliers', EditSupplier);

routes.use(AdminToken);
routes.get('/users', ListOfUsers);
routes.get('/users/:id', SingleUser);
routes.post('/suppliers', CreateSupplier);

module.exports = routes;