const express = require('express')
var admin = require("firebase-admin");
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const app = express()


// NOTA: Es necesario tener este archivo para acceder a base de datos
var serviceAccount = require("./FirebaseKey"); 

// Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lsm-john-deere-default-rtdb.firebaseio.com"
});

const db = getFirestore();

const users = await db.collection('users').get();
users.forEach((doc) => {
  console.log(doc.id, '=>', doc.data());
});



app.get('/health', function (req, res) {
    res.send('OK')
})

app.listen(3000)