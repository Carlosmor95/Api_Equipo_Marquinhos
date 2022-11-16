import db from "./firebase.js";
import {
    getUsersDB,
    writeUserDataDB,
    getDataUserDB,
    putlogInDB
} from "./dbFunctions.js";


export async function putlogIn(req, res) {
    const { email, password } = req.body;
    res.send(await(putlogInDB(email, password, res)));
}

export async function getUsers(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(await(getUsersDB(db)))
}

export async function writeUSerData(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.send(await(writeUserDataDB(db, 'Daniel', 'Case', 'Ubsy23ruh')))
}

export async function getDataUser(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.send(await(getDataUserDB(db, 'Jorge', 'Cruz')))
}

