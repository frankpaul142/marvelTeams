const request_api = require('request-promise');

'use strict';
import firebase from '../configFB'

const db = firebase.firestore();

const getAllCharacters = (input) => {
    const config = '?apikey=' + input.apikey + '&limit=' + input.limit + '&hash=8d30cf9d4c87e66d12586fce3c3d7c79';
    return new Promise(function (resolve, reject) {
        request_api({
            method: "GET",
            uri: 'https://gateway.marvel.com:443/v1/public/characters' + config,
            json: true,
            headers: {
                'content-type': 'application/json',
            }
        }).then(data => {
            resolve(data.data);
        }).catch(err => {
            reject(err);
        });

    })
};


const getCharacterId = (input) => {
    return new Promise(function (resolve, reject) {
        request_api({
            method: "GET",
            uri: 'https://gateway.marvel.com:443/v1/public/characters/' + input.id + config,
            json: true,
            headers: {
                'content-type': 'application/json',
            }
        }).then(data => {
            console.log('response');
            console.log(data);
            resolve(data);
        }).catch(err => {
            reject(err);
        });

    })
};

const deleteDoc = (input) => {
    return new Promise((resolve, reject) => {
        db.doc('tasks/' + input.id).delete().then(() => {
            resolve()
        }).catch(err => {
            reject(err)
        });
    })
};

const getByAction = (action) => {
    return new Promise((resolve, reject) => {
        db.collection('tasks').where('action', '==', action).get().then(querySnapshot => {
            if (querySnapshot.empty) {
                reject();
            } else {
                let task = null;
                querySnapshot.forEach(documentSnapshot => {
                    task = documentSnapshot.data();
                    task.id = documentSnapshot.id;
                });
                resolve(task)
            }
        }).catch(err => {
            reject(err)
        });
    })
};

module.exports = {
    // getAll,
    getAllCharacters,
    getCharacterId,
    // create,
    // update,
    deleteDoc,
    getByAction
};