import express from 'express'
import cors from 'cors'
import * as controller from '../controllers/roleController'
import * as validator from '../validators/roleValidator'
import authenticate from '../middleware/auth'
import checkAction from '../middleware/action'

const api = express.Router();
api.use(cors({origin: true}));
api.use(authenticate);

api.get('/', checkAction('role.getAll'), validator.validateGetAll, controller.getAll);
api.post('/', checkAction('role.create'), validator.validateCreate, controller.create);
api.put('/:id', checkAction('role.update'), validator.validateUpdate, controller.update);
api.get('/:id', checkAction('role.get'), validator.validateGetById, controller.getById);
api.delete('/:id', checkAction('role.delete'), validator.validateGetById, controller.deleteDoc);
api.post('/assignTasks', checkAction('role.assignTasks'), validator.validateAssignTasks, controller.assignTasks);

module.exports = api;