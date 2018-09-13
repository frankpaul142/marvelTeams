import * as lodash from 'lodash'
import * as store from '../stores/userStore'
import * as transformer from '../transformers/userTransformer'

const getAll = (req, res) => {
    let input = req.query || {};
    store.getAll(input).then(result => {
        res.status(200).send(transformer.transformCollection(input, result));
    }).catch(error => {
        res.status(400).send({message: error});
    });
};
const create = (req, res) => {
    let input = req.body;
    store.create(input).then(result => {
        res.status(200).send(transformer.transform(result));
    }).catch(error => {
        res.status(400).send({message: error});
    });
};

const update = (req, res) => {
    let input = req.body;
    input.id = req.params.id;
    store.update(input).then(result => {
        res.status(200).send(transformer.transform(result));
    }).catch(error => {
        res.status(400).send({message: error});
    });
};

const getById = (req, res) => {
    let input = req.params;
    store.getById(input).then(result => {
        res.status(200).send(transformer.transform(result));
    }).catch(error => {
        res.status(400).send({message: error});
    });
};

const assignRole = (req, res) => {
    let input = req.body;
    store.assignRole(input).then(() => {
        res.status(204).send();
    }).catch(error => {
        res.status(400).send({message: error});
    });
};

const getActionsTasks = (req, res) => {
    store.getActionsTasks(res.locals.userId).then(result => {
        res.status(200).send(result);
    }).catch(error => {
        res.status(400).send({message: error});
    });
};

const createStep2 = (req, res) => {
    let input = req.body;
    input.id = res.locals.userId;
    input.email = res.locals.email;
    store.createStep2(input).then(result => {
        res.status(200).send(transformer.transform(result));
    }).catch(error => {
        res.status(400).send({message: error});
    });
};
const updateNewUser = (req, res) => {
    let input = req.body;
    input.id = res.locals.userId;
    store.updateNewUser(input).then(() => {
        res.status(204).send();
    }).catch(error => {
        res.status(400).send({message: error});
    });
};

module.exports = {
    getAll,
    create,
    update,
    getById,
    assignRole,
    getActionsTasks,
    createStep2,
    updateNewUser
};