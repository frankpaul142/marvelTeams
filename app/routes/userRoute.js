import express from 'express'
import cors from 'cors'
import * as controller from '../controllers/userController'
import * as validator from '../validators/userValidator'
import authenticate from '../middleware/auth'

const api = express.Router();
api.use(cors({origin: true}));
// api.use(authenticate);

api.get('/', validator.validateGetAll, controller.getAll);
api.post('/', validator.validateCreate, controller.create);
api.post('/step2', validator.validateCreateStep2, controller.createStep2);
api.put('/:id', validator.validateUpdate, controller.update);
api.get('/:id', validator.validateGetById, controller.getById);
api.post('/assignRole', validator.validateAssignRole, controller.assignRole);
api.get('/tasks/action', controller.getActionsTasks);
api.post('/newUser', validator.validateUpdateNewUser, controller.updateNewUser);

module.exports = api;