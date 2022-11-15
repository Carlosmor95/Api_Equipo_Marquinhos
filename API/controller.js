import db from "./firebase.js";

import {
    getUsersDB
} from "./dbFunctions.js";

export async function getUsers(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(await(getUsersDB(db)))
}
