import db from "./firebase.js";
import {
    getUsersDB,
    writeUserDataDB,
    getDataUserDB,
    putlogInDB,
    createGroupDB,
    addUserToGroupDB
} from "./dbFunctions.js";


export async function putlogIn(req, res) {
    const { email, password } = req.body;
    res.send(await(putlogInDB(email, password, res)));
}

export async function getUsers(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(await(getUsersDB(db)))
}

//Para poder pasarle parametros a la función será necesario utilizar "req"
/*
const eMail = req.body.email
por ejemplo

No se como sea bien en las MAC
*/ 
export async function writeUSerData(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.send(await(writeUserDataDB(db, 'Daniel', 'Case', 'correo@tec.mx', '123')))
}

export async function getDataUser(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.send(await(getDataUserDB(db, 'Jorge', 'Cruz', 'correo@tec.mx')))
}

export async function createGroup(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(await(createGroupDB(db)))
}

export async function addUserToGroup(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(await(addUserToGroupDB(db, 'correo@tec.mx', 'rXjhG3iVTx2wCTlJ0JVw0c8OkK68')))
}
