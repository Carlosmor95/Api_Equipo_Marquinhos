import { doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


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
export async function writeUserDataDB(db, firstName, lastName, docName) {
    const data = {
        firstname: firstName,
        lastname: lastName,
        uid: docName,
    };

    await db.collection('users').doc(docName).set({
        capital: true
        }, {merge: true});   
    await db.collection('users').doc(docName).set(data);

    console.log('Se añadio el usuario al documento: ', docName);
    return "Success!!";
}

//Obtener los datos de un usuario especifico a través de sus nombres
export async function getDataUserDB(db, firstName, lastName){
    await db.collection('users').get()
    .then((users) => {
        users.forEach((doc) =>{
            if(doc.data().firstname === firstName && doc.data().lastname === lastName){
                console.log(doc.data());
                return JSON.stringify(doc.data());
            }
        });
    })
    .catch((error) => {
        console.error(error);
    });
}
