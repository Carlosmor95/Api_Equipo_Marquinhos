import { doc, setDoc } from "firebase/firestore";

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
