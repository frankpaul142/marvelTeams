'use strict';
import firebase from '../configFB'
import constants from '../libs/constants'
import {getByAction} from './taskStore'
import {asyncLoop} from '../libs/util'

const db = firebase.firestore();
const auth = firebase.auth();

const getAll = (input) => {
    return new Promise((resolve, reject) => {
        let ref = db.collection('users');
        let refAll = db.collection('users');
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
            first_name: input.first_name,
            last_name: input.last_name,
            email: input.email,
            country_id: input.country_id || null,
            city_id: input.city_id || null,
            postal_code: input.postal_code || null,
            country_code: input.country_code || null,
            phone: input.phone || null,
            role_id: input.role_id || null,
            created_at: new Date(),
            updated_at: new Date()
        };
        let user_uid = input.user_id;
        db.doc('users/' + user_uid).set(data).then(() => {
            data.id = user_uid;
            resolve(data)
        }).catch((err) => {
            let message = 'Ocurrió un error al crear el usuario, intente nuevamente...';
            switch (err.code) {
                case 'auth/email-already-in-use':
                    message = 'Ya existe un usuario con esa dirección de email.';
                    return;
                case 'auth/invalid-email':
                    message = 'Ingrese un email válido.';
                    return;
                case 'auth/operation-not-allowed':
                    message = 'Servicio no disponible.';
                    return;
                case 'auth/weak-password':
                    message = 'La contraseña es muy débil.';
                    return;
            }
            reject(message)
        });
    })
};
const update = (input) => {
    return new Promise((resolve, reject) => {
        let ref = db.doc('users/' + input.id);
        ref.get().then(snapshot => {
            let data = snapshot.data();
            data.first_name = input.first_name;
            data.last_name = input.last_name;
            data.country_id = input.country_id || null;
            data.city_id = input.city_id || null;
            data.postal_code = input.postal_code || null;
            data.country_code = input.country_code || null;
            data.phone = input.phone || null;
            data.role_id = input.role_id || null;
            data.updated_at = new Date();
            return data;
        }).then(data => {
            ref.set(data).then(() => {
                data.id = input.id;
                if (input.password) {
                    firebase.auth().updateUser(input.id, {
                        password: input.password
                    }).then(userRecord => {
                        resolve(data)
                    }).catch(error => {
                        reject(err)
                    });
                } else {
                    resolve(data)
                }
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
        let ref = db.doc('users/' + input.id);
        ref.get().then(snapshot => {
            let data = snapshot.data();
            data.id = input.id;
            resolve(data)
        }).catch(err => {
            reject(err)
        });
    })
};
const assignRole = (input) => {
    return new Promise((resolve, reject) => {
        let userIds = input.user_ids;
        asyncLoop(userIds.length, loop => {
            let userId = userIds[loop.iteration()];
            let ref = db.doc('users/' + userId);
            ref.update({
                role_id: input.role_id,
                updated_at: new Date()
            }).then(() => {
                loop.next();
            }).catch(err => {
                loop.next();
            });
        }, () => {
            resolve()
        });
    })
};
const checkAdminUser = (userId) => {
    return new Promise((resolve, reject) => {
        let result = {status: false, roleId: null, tasksIds: []};
        db.doc('users/' + userId).get().then(snapshot => {
            if (snapshot.exists)
                return snapshot.data();
            else
                resolve(result)
        }).then(dataUser => {
            if (dataUser.role_id) {
                result.roleId = dataUser.role_id;
                db.doc('roles/' + dataUser.role_id).get().then(snapshot => {
                    if (snapshot.exists) {
                        result.status = snapshot.data().name === constants.roleAdmin;
                        result.tasksIds = snapshot.data().tasks || [];
                        resolve(result);
                    } else {
                        resolve(result)
                    }
                }).catch(err => {
                    resolve(result)
                })
            } else {
                resolve(result)
            }
        }).catch(err => {
            resolve(result)
        })
    })
};
const checkTaskAction = (taskAction, tasksIds) => {
    return new Promise((resolve, reject) => {
        let result = false;
        getByAction(taskAction).then(taskData => {
            tasksIds.forEach(taskId => {
                if (taskData.id === taskId)
                    result = true
            });
            resolve(result)
        }).catch(err => {
            resolve(result)
        });
    })
};
const getActionsTasks = (userId) => {
    return new Promise((resolve, reject) => {
        let ref = db.doc('users/' + userId);
        ref.get().then(snapshot => {
            return snapshot.data();
        }).then(dataUser => {
            if (dataUser.role_id) {
                let refRole = db.doc('roles/' + dataUser.role_id);
                return refRole.get().then(snapshot => {
                    return snapshot.data();
                }).catch(err => {
                    reject(err)
                });
            } else {
                resolve({isAdmin: false, tasks: []});
            }
        }).then(dataRole => {
            if (dataRole.name === constants.roleAdmin) {
                resolve({isAdmin: true, tasks: []})
            } else if (dataRole.tasks) {
                let tasks = [];
                asyncLoop(dataRole.tasks.length, loop => {
                    let taskId = dataRole.tasks[loop.iteration()];
                    let refTask = db.doc('tasks/' + taskId);
                    refTask.get().then(snapshot => {
                        if (snapshot.exists)
                            tasks.push(snapshot.data().action);
                        loop.next()
                    }).catch(err => {
                        loop.next()
                    });
                }, () => {
                    resolve({isAdmin: false, tasks: tasks})
                });
            } else {
                resolve({isAdmin: false, tasks: []});
            }
        }).catch(err => {
            reject(err)
        });
    })
};
const createStep2 = (input) => {
    return new Promise((resolve, reject) => {
        let data = {
            first_name: input.first_name,
            last_name: input.last_name,
            email: input.email,
            document_type: input.document_type,
            document: input.document,
            country_id: input.country_id || null,
            city_id: input.city_id || null,
            postal_code: input.postal_code || null,
            country_code: input.country_code || null,
            phone: input.phone || null,
            is_new_user: true,
            created_at: new Date(),
            updated_at: new Date()
        };
        db.doc('users/' + input.id).set(data).then(() => {
            data.id = input.id;
            resolve(data)
        }).catch((err) => {
            reject(err)
        });
    })
};

const updateNewUser = (input) => {
    return new Promise((resolve, reject) => {
        let data = {
            is_new_user: input.is_new_user,
            updated_at: new Date()
        };
        db.doc('users/' + input.id).update(data).then(() => {
            resolve()
        }).catch((err) => {
            reject(err)
        });
    })
};

module.exports = {
    getAll,
    create,
    update,
    getById,
    assignRole,
    checkAdminUser,
    checkTaskAction,
    getActionsTasks,
    createStep2,
    updateNewUser
};