import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
// NOTA: Es necesario tener este archivo para acceder a base de datos
import serviceAccount from "./FirebaseKey.json" assert { type: "json" }; 

// Firebase
import admin from "firebase-admin";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lsm-john-deere-default-rtdb.firebaseio.com"
});

const db = getFirestore();

export default db;