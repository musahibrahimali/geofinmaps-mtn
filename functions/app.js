const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// auth trigger (new user signup)
exports.newUserSignUp = functions.auth.user().onCreate((user) => {
  // for background triggers you must return a value/promise
  console.log("a new user created");
  return `user created successfully ${user.email}`;
});

exports.onUserLogIn = functions.https.onCall((data, context) => {
  return {
    user: data.user,
  };
});

exports.storeClientData = functions.https.onCall((data, context) => {
  return admin.firestore().collection("users").doc(data.userUID).set({
    emailAddress: data.emailAddress,
    fullName: data.fullName,
    phoneNumber: data.phoneNumber,
    city: data.city,
    gender: data.gender,
    department: data.department,
    hireDate: data.hireDate,
    isPermanent: data.isPermanent,
    isAdmin: data.isAdmin,
  });
});

exports.storeAdminData = functions.https.onCall((data, context) => {
  return admin.firestore().collection("admins").doc(data.userUID).set({
    emailAddress: data.emailAddress,
    fullName: data.fullName,
    phoneNumber: data.phoneNumber,
    city: data.city,
    gender: data.gender,
    department: data.department,
    hireDate: data.hireDate,
    isPermanent: data.isPermanent,
    isAdmin: data.isAdmin,
  });
});

// auth trigger (user deleted)
exports.userDeleted = functions.auth.user().onDelete((user) => {
  console.log("user deleted");
});

exports.deleteAdmin = functions.https.onCall((data, context) => {
  const doc = admin.firestore().collection("admins").doc(data.uid);
  admin.auth().deleteUser(data.uid).then(() => {
    return doc.delete();
  }).catch((error) => {
    console.log("there was an error deleting admin", error);
  });
});

exports.deleteClient = functions.https.onCall((data, context) => {
  const doc = admin.firestore().collection("users").doc(data.uid);
  admin.auth().deleteUser(data.uid).then(() => {
    return doc.delete();
  }).catch((error) => {
    console.log("there was an error deleting user", error);
  });
});

/* add cable data */

exports.addCableData = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "only authenticated users can add data"
    );
  }
  return admin.firestore().collection("cable_data").add({
    city: data.city,
    details: data.details,
    coord: {
      lat: data.coord.lat,
      lng: data.coord.lng,
    },
    location: data.location,
  });
});

exports.updateCableData = functions.https.onCall((data, context) => {
  return "Null";
});

exports.deleteCableData = functions.https.onCall((data, context) => {
  const doc = admin.firestore().collection("cable_data").doc(data.uid);
  return doc.delete();
});

/* add report */
exports.addReport = functions.https.onCall((data, context) => {
  /* throw error if not authenticated */
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "only authenticated users can add data"
    );
  }
  return admin.firestore().collection("reports").add({
    fullName: data.fullName,
    emailAddress: data.emailAddress,
    location: data.location,
    description: data.description,
    level: data.level,
    title: data.title,
    reportDate: data.reportDate,
    userUID: data.userUID,
    coord: {
      lat: data.lat,
      lng: data.lng,
    },
  });
});

/* delete report */
exports.deleteReport = functions.https.onCall((data, context) => {
  const doc = admin.firestore().collection("reports").doc(data.uid);
  return doc.delete();
});

/* get cable data */
exports.getAllCableData = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    const timeStamp = admin.firestore.FieldValue.serverTimestamp();
    const data = admin.firestore()
        .collection("cable_data")
        .orderBy(timeStamp, "asc");
    const cables = [];
    data.get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        cables.push(doc.data());
      });
      return response.status(200).send({cables: cables});
    });
  });
});

/* get all users */
exports.getAllReports = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    const timeStamp = admin.firestore.FieldValue.serverTimestamp();
    const data = admin.firestore()
        .collection("reports")
        .orderBy(timeStamp, "asc");
    const reports = [];
    data.get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        reports.push(doc.data());
      });
      return response.status(200).send({reports: reports});
    });
  });
});

/* get users */
exports.getAllUsers = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    const timeStamp = admin.firestore.FieldValue.serverTimestamp();
    const data = admin.firestore()
        .collection("users")
        .orderBy(timeStamp, "asc");
    const users = [];
    data.get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        users.push(doc.data());
      });
      return response.status(200).send({users: users});
    });
  });
});
