'use strict';
import firebase from '../configFB'

const db = firebase.firestore();

const getAll = (input) => {
    return new Promise((resolve, reject) => {
        let ref = db.collection('tasks');
        let refAll = db.collection('tasks');
        refAll.get().then(querySnapshot => {
            let total = querySnapshot.size;
            if (input.orderBy && input.orderType)
                ref = ref.orderBy(input.orderBy, input.orderType);
            if (input.limit && input.page)
                ref = ref.limit(parseInt(input.limit)).offset((parseInt(input.page) - 1) * parseInt(input.limit));
            ref.get().then(querySnapshot => {
                resolve({docs: querySnapshot.docs, total: total})
            }).catch((err) => {
                reject(err)
            });
        }).catch((err) => {
            reject(err)
        });
    })
};
const create = (input) => {
    return new Promise((resolve, reject) => {
        let data = {
            name: input.name,
            action: input.action,
            description: input.description || null,
            created_at: new Date(),
            updated_at: new Date()
        };
        let ref = db.collection('tasks').doc();
        ref.set(data).then(() => {
            data.id = ref.id;
            resolve(data)
        }).catch((err) => {
            reject(err)
        });
    })
};

const update = (input) => {
    return new Promise((resolve, reject) => {
        let ref = db.doc('tasks/' + input.id);
        ref.get().then(snapshot => {
            let data = snapshot.data();
            data.name = input.name;
            data.action = input.action;
            data.description = input.description || data.description;
            data.updated_at = new Date();
            return data;
        }).then(data => {
            ref.set(data).then(() => {
                data.id = input.id;
                resolve(data)
            }).catch(err => {
                reject(err)
            });
        }).catch(err => {
            reject(err)
        });
    })
};

const getById = (input) => {
    return new Promise((resolve, reject) => {
        let ref = db.doc('tasks/' + input.id);
        ref.get().then(snapshot => {
            let data = snapshot.data();
            data.id = input.id;
            resolve(data)
        }).catch(err => {
            reject(err)
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
    getAll,
    create,
    update,
    getById,
    deleteDoc,
    getByAction
};