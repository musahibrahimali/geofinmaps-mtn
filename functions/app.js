const functions = require("firebase-functions");
const admin = require("firebase-admin");
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
  const userUID = data.userUID;
  const emailAddress = data.emailAddress;
  const fullName = data.fullName;
  const phoneNumber = data.phoneNumber;
  const city = data.city;
  const gender = data.gender;
  const department = data.departmentId;
  const hireDate = data.hireDate;
  const isPermanent = data.isPermanent;
  const isAdmin = data.isAdmin;
  const userData = {
    emailAddress: emailAddress,
    fullName: fullName,
    phoneNumber: phoneNumber,
    city: city,
    gender: gender,
    departmentId: department,
    hireDate: hireDate,
    isPermanent: isPermanent,
    isAdmin: isAdmin,
  };
  return admin.firestore().collection("users").doc(userUID).set(userData);
});

exports.storeAdminData = functions.https.onCall((data, context) => {
  const userUID = data.userUID;
  const emailAddress = data.emailAddress;
  const fullName = data.fullName;
  const phoneNumber = data.phoneNumber;
  const city = data.city;
  const gender = data.gender;
  const department = data.departmentId;
  const hireDate = data.hireDate;
  const isPermanent = data.isPermanent;
  const isAdmin = data.isAdmin;
  const adminData = {
    emailAddress: emailAddress,
    fullName: fullName,
    phoneNumber: phoneNumber,
    city: city,
    gender: gender,
    departmentId: department,
    hireDate: hireDate,
    isPermanent: isPermanent,
    isAdmin: isAdmin,
  };
  return admin.firestore().collection("admins").doc(userUID).set(adminData);
});

// auth trigger (user deleted)
exports.userDeleted = functions.auth.user().onDelete((user) => {
  console.log("user deleted");
});

exports.deleteAdmin = functions.https.onCall((data, context) => {
  const doc = admin.firestore().collection("admins").doc(data.uid);
  return doc.delete();
});

exports.deleteClient = functions.https.onCall((data, context) => {
  const doc = admin.firestore().collection("users").doc(data.uid);
  return doc.delete();
});

/* add cable data */

exports.addCableData = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "only authenticated users can add data"
    );
  }
  return admin.firestore().collection("cable_data").add(data);
});
