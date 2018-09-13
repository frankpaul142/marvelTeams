import express from 'express'
import cors from 'cors'
import * as controller from '../controllers/donationController'
import * as validator from '../validators/donationValidator'
import authenticate from '../middleware/auth'
import checkAction from '../middleware/action'

const api = express.Router();
api.use(cors({origin: true}));
api.use(authenticate);

api.get('/', checkAction('donation.getAll'), validator.validateGetAll, controller.getAll);
api.post('/', checkAction('donation.create'), validator.validateCreate, controller.create);
api.put('/:id', checkAction('donation.update'), validator.validateUpdate, controller.update);
api.get('/:id', checkAction('donation.get'), validator.validateGetById, controller.getById);
api.delete('/:id', checkAction('donation.delete'), validator.validateGetById, controller.deleteDoc);

module.exports = api;