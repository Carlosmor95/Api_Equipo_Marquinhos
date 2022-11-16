import db from "./firebase.js";

import {
    getUsersDB,
    writeUserDataDB,
    getDataUserDB,
    createGroupDB
} from "./dbFunctions.js";

export async function getUsers(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(await(getUsersDB(db)))
}

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
