'use strict';
import firebase from '../configFB'

const db = firebase.firestore();

const getAll = (input) => {
    return new Promise((resolve, reject) => {
        let ref = db.collection('donations');
        let refAll = db.collection('donations');
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
            first_name: input.first_name || null,
            last_name: input.last_name || null,
            email: input.email || null,
            phone: input.phone || null,
            amount: input.amount,
            type: input.type,
            user_id: input.user_id,
            created_at: new Date(),
            updated_at: new Date()
        };
        let ref = db.collection('donations').doc();
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
        let ref = db.doc('donations/' + input.id);
        ref.get().then(snapshot => {
            let data = snapshot.data();
            data.first_name = input.first_name || null;
            data.last_name = input.last_name || null;
            data.email = input.email || null;
            data.phone = input.phone || null;
            data.amount = input.amount;
            data.type = input.type;
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
        let ref = db.doc('donations/' + input.id);
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
        db.doc('donations/' + input.id).delete().then(() => {
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
    deleteDoc
};