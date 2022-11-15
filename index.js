const express = require('express')
var admin = require("firebase-admin");

const app = express()


// NOTA: Es necesario tener este archivo para acceder a base de datos
var serviceAccount = require("./FirebaseKey"); 

// Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lsm-john-deere-default-rtdb.firebaseio.com"
});

var database = admin.database();
var ref = database.ref("referencia/de/documento/inaccesible/con/Javascrip/en/el/cliente");
ref.once("value", function(snapshot) {
console.log("El dato es", snapshot.val());
});


app.get('/health', function (req, res) {
    res.send('OK')
})

app.listen(3000)