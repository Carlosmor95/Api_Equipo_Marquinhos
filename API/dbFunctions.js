
import e from "express";
import { doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FieldValue } from "firebase-admin/firestore";


const config = {
    apiKey: "AIzaSyC9l7JQ4Wmy3sZUlh51rpbIhiBl-4UmYEQ",
    authDomain: "lsm-john-deere.firebaseapp.com",
    databaseURL: "https://lsm-john-deere-default-rtdb.firebaseio.com",
    projectId: "lsm-john-deere",
    storageBucket: "lsm-john-deere.appspot.com",
    messagingSenderId: "936805908022",
    appId: "1:936805908022:web:91ba54a3a851dea82da297",
    measurementId: "G-G0TVHHCD05"
  };

  const app = initializeApp(config);
  const auth = getAuth(app);

  //const fs = getFirestore(app);

export async function putlogInDB(email, password, res) {
    await signInWithEmailAndPassword(auth, email, password)
    .then((data) => {
        return data.user.getIdToken();
    })
    .then((token) => {
        return res.json({ token });
    })
    .catch((err) => {
        console.error(err);
        return res.status(403).json({ general: "Wrong credentials, please try again"})
    });
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}



export async function getUsersDB(db) {
    var usersArray = [];
    await db.collection('users').get()
    .then((users) => {
        users.forEach((doc) => {
            usersArray.push(doc.data());
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
    return JSON.stringify(usersArray);
}

//Añadir un usuario a la base de datos con un documento distinto
//Se necesita un documento distinto para cada usuario, ya que no es posible añadir varios usuarios en uno solo, se sobreescriben
export async function writeUserDataDB(db, firstName, lastName, eMail, password, hasGroup, lectionProgress) {
    var docID = makeid(28);
    const data = {
        firstname: firstName,
        lastname: lastName,
        email: eMail,
        password: password,
        group: hasGroup,
        lections: lectionProgress,
        uid: docID,
    };

    await db.collection('users').doc(docID).set({
        capital: true
        }, {merge: true});   
    await db.collection('users').doc(docID).set(data);

    console.log('Se añadio el usuario al documento: ', docID);
    return "Success!!";
}

export async function writeAdminDataDB(db, eMail, password, companyName){
    var docID = makeid(28);
    const data = {
        email: eMail,
        password: password,
        company: companyName,
        uid: docID,
    };
    await db.collection('admins').doc(docID).set({
        capital: true
        }, {merge: true});   
    await db.collection('admins').doc(docID).set(data);
}

//Obtener los datos de un usuario especifico a través de sus nombres o por su correo electrónico
export async function getDataUserDB(db, firstName, lastName, eMail){
    var usersArray = [];
    await db.collection('users').get()
    .then((users) => {
        users.forEach((doc) =>{
            if((doc.data().firstname === firstName && doc.data().lastname === lastName) || (doc.data().email == eMail)){
                usersArray.push(doc.data());
                console.log(doc.data());
                
            }
        });
    })
    .catch((error) => {
        console.error(error);
    });
    return JSON.stringify(usersArray);
}

//Función para que un administrador pueda crear grupos
export async function createGroupDB(db){
    const data = {
        users: []
    };

    var docID = makeid(28);
    await db.collection('userGroups').doc(docID).set(
        {capital: true}, {merge: true});  
    
    await db.collection('userGroups').doc(docID).set(data);
    return "Success, created group: " + docID; 
}

//Función para que el administrador pueda añadir usuarios a un grupo
export async function addUserToGroupDB(db, eMail, docName){
    await db.collection('userGroups').doc(docName).update({
        users: FieldValue.arrayUnion(eMail)
        
    })
    .catch((error) => {
        console.error(error);
    });

    await db.collection('users').get()
    .then((users) => {
        users.forEach((doc) =>{
            if(doc.data().email == eMail){
                db.collection('users').doc(doc.data().uid).update({
                    group: docName
                })
            }
        });
    })
    .catch((error) => {
        console.error(error);
    });
    return "Success!!";
}

//Función para comprobar si un usuario es un administrador, esto no se puede añadir a un usuario normal porqué la cantidad de atributos excede el límite
export async function isAdminDB(db, eMail){
    let is = 'false';
    await db.collection('admins').get()
    .then((admins) => {
        admins.forEach((doc) =>{
            if(doc.data().email == eMail){
                is = 'true';
            }
        });
    })
    .catch((error) => {
        console.error(error);
    });
    return is;
}