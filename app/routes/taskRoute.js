import express from 'express'
import cors from 'cors'
import * as controller from '../controllers/taskController'
import * as validator from '../validators/taskValidator'
import authenticate from '../middleware/auth'
import checkAction from "../middleware/action"

const api = express.Router();
api.use(cors({origin: true}));
// api.use(authenticate);

api.get('/', checkAction('task.getAll'), validator.validateGetAll, controller.getAll);
api.post('/', checkAction('task.create'), validator.validateCreate, controller.create);
api.put('/:id', checkAction('task.update'), validator.validateUpdate, controller.update);
api.get('/:id', checkAction('task.get'), validator.validateGetById, controller.getById);
api.delete('/:id', checkAction('task.delete'), validator.validateGetById, controller.deleteDoc);

module.exports = api;