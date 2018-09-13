'use strict';
import firebase from '../configFB'

const auth = firebase.auth();

const authenticate = (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))
        return res.status(401).send({message: 'No tiene permisos para realizar esta acción.'});

    let idToken = req.headers.authorization.split('Bearer ')[1];
    auth.verifyIdToken(idToken).then(decodedIdToken => {
        res.locals.userId = decodedIdToken.uid;
        res.locals.email = decodedIdToken.email || null;
        next();
    }).catch(error => {
        res.status(401).send({message: 'No tiene permisos para realizar esta acción.'});
    });
};

module.exports = authenticate;