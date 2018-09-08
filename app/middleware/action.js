'use strict';
import * as userStore from '../stores/userStore'


const handle = (taskAction) => {
    return (req, res, next) => {
        let userId = res.locals.userId;
        if (userId) {
            userStore.checkAdminUser(userId).then(result => {
                if (result.status) {
                    next();
                } else {
                    userStore.checkTaskAction(taskAction, result.tasksIds).then(resultTask => {
                        if (resultTask)
                            next();
                        else
                            res.status(401).send({message: 'No tiene permisos para realizar esta acción.'});
                    })
                }
            })
        } else {
            //pass when auth middleware doesn't work
            next();
        }
    }
};

module.exports = handle;