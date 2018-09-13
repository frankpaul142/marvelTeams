'use strict';
import validy from 'validy'
import firebase from '../configFB'
import * as util from '../libs/util'

const db = firebase.firestore();
const auth = firebase.auth();

validy.validators.add({
    unique: (value, options, object, fullObject, path) => {
        if (!value)
            return Promise.resolve();
        if (options.isKey) {
            return db.doc(options.collection + '/' + value).get().then(snapshot => {
                if (snapshot.exists)
                    return Promise.resolve(options.message);
                else
                    return Promise.resolve()
            }).catch(err => {
                return Promise.resolve()
            })
        } else {
            return db.collection(options.collection).where(path.pop(), '==', value).get().then(querySnapshot => {
                if (querySnapshot.empty) {
                    return Promise.resolve()
                } else {
                    if (object.id) {
                        if (object.id !== querySnapshot.docs[0].id)
                            return Promise.resolve(options.message);
                        else
                            return Promise.resolve()
                    }
                    return Promise.resolve(options.message)
                }
            }).catch(err => {
                return Promise.resolve()
            })
        }
    },
    exists: (value, options, object, fullObject, path) => {
        if (!value)
            return Promise.resolve();
        if (options.isKey) {
            return db.doc(options.collection + '/' + value).get().then(snapshot => {
                if (snapshot.exists)
                    return Promise.resolve();
                else
                    return Promise.resolve(options.message)
            }).catch(err => {
                return Promise.resolve()
            })
        } else {
            return db.collection(options.collection).where(path.pop(), '==', value).get().then(querySnapshot => {
                if (querySnapshot.empty)
                    return Promise.resolve(options.message);
                else
                    return Promise.resolve()
            }).catch(err => {
                return Promise.resolve()
            })
        }
    },
    requiredIf: (value, options, object, fullObject, path) => {
        if (object[options.field]) {
            if (!value)
                return options.message
        }
    },
    existsAuth: (value, options, object, fullObject, path) => {
        if (!value)
            return Promise.resolve();
        return auth.getUser(value).then(function (userRecord) {
            return Promise.resolve();
        }).catch(function (error) {
            return Promise.resolve(options.message);
        });
    },
    documentECU: (value, options, object, fullObject, path) => {
        if (!value)
            return options.message;
        if (!util.validateDocumentECU(value, object[options.type]))
            return options.message;

    },
});

module.exports = validy;