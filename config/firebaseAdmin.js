import admin from 'firebase-admin';
const serviceAccount = './key/firebase-key.json';

export const verifyIdToken = (token) => {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://roam-ghana-default-rtdb.firebaseio.com"
        });
    }

    return admin
        .auth()
        .verifyIdToken(token)
        .catch((error) => {
            throw error;
        });
};
