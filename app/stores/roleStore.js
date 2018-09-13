'use strict';
import firebase from '../configFB'

const db = firebase.firestore();

const getAll = (input) => {
    return new Promise((resolve, reject) => {
        let ref = db.collection('roles');
        let refAll = db.collection('roles');
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
            description: input.description,
            created_at: new Date(),
            updated_at: new Date()
        };
        let ref = db.collection('roles').doc();
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
        let ref = db.doc('roles/' + input.id);
        ref.get().then(snapshot => {
            let data = snapshot.data();
            data.name = input.name;
            data.description = input.description;
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
        let ref = db.doc('roles/' + input.id);
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
        db.doc('roles/' + input.id).delete().then(() => {
            resolve()
        }).catch(err => {
            reject(err)
        });
    })
};

const assignTasks = (input) => {
    return new Promise((resolve, reject) => {
        db.doc('roles/' + input.id).update({tasks: input.tasks, updated_at: new Date()}).then(() => {
            resolve()
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
    assignTasks
};