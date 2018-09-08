import * as admin from 'firebase-admin'
import * as serviceAccount from '../serviceAccountKeyOld'
admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

module.exports = admin;