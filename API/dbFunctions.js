import e from "express";
import { doc, setDoc } from "firebase/firestore";

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
export async function writeUserDataDB(db, firstName, lastName, eMail, password) {
    var docID = makeid(28);
    const data = {
        firstname: firstName,
        lastname: lastName,
        email: eMail,
        password: password,
        uid: docID,
    };

    await db.collection('users').doc(docID).set({
        capital: true
        }, {merge: true});   
    await db.collection('users').doc(docID).set(data);

    console.log('Se añadio el usuario al documento: ', docID);
    return "Success!!";
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

export async function createGroupDB(db){
    var docID = makeid(28);
    await db.collection('userGroups').doc(docID).set(
        {capital: true}, {merge: true});  
    return "Success, created group: " + docID; 
}

export async function addUserToGroup(db, firstName, lastName, docName){
    const data = {
        firstname: firstName,
        lastname: lastName,
    };

    await db.collection('userGroups').get()
    .then((userGroups) => {
        userGroups.forEach((doc) =>{
            console.log(doc.data());
        });
    })
    console.log('Se añadio el usuario al documento: ', docName);
    return "Success!!";
}