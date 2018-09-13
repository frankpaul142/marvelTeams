import express from 'express'
import cors from 'cors'
import * as controller from '../controllers/marvelController'
// import * as validator from '../validators/marvelValidator'
// import authenticate from '../middleware/auth'
// import checkAction from "../middleware/action"

const api = express.Router();
api.use(cors({origin: true}));

api.get('/', controller.getAllCharacters);
api.get('/:id', controller.getCharacterId);


// api.post('/',  validator.validateCreate, controller.create);
// api.put('/:id',  validator.validateUpdate, controller.update);
// api.delete('/:id', validator.validateGetById, controller.deleteDoc);

module.exports = api;