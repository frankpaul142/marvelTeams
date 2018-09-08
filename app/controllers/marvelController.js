import * as store from '../stores/marvelStore'
import * as transformer from '../transformers/marvelTransformer'

const getAllCharacters= (req, res) => {
    let input = req.query || {};
    store.getAllCharacters(input).then(result => {
        // res.status(200).send(result);
        res.status(200).send(transformer.transformCollection(input, result));
    }).catch(error => {
        res.status(400).send({message: error});
    });
};

const getCharacterId = (req, res) => {
    let input = req.params;
    store.getCharacterId(input).then(result => {
        // res.status(200).send(transformer.transform(result));
        res.status(200).send(result);
    }).catch(error => {
        res.status(400).send({message: error});
    });
};

const create = (req, res) => {
    let input = req.body;
    input.user_id = res.locals.userId || null;
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


const deleteDoc = (req, res) => {
    let input = req.params;
    store.deleteDoc(input).then(() => {
        res.status(204).send();
    }).catch(error => {
        res.status(400).send({message: error});
    });
};

module.exports = {
    getAllCharacters,
    getCharacterId,
    create,
    update,
    deleteDoc
};