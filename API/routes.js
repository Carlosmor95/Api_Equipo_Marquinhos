import { Router } from "express";

import {
	getUsers,
	writeUSerData,
	getDataUser,
	createGroup,
	addUserToGroup
} from "./controller.js";

const router = Router();

// Get
router.get("/users", getUsers);
router.get("/user", getDataUser);

// Post
router.get("/signIn", writeUSerData);
router.get("/createGroup", createGroup);

// Put
router.get("/addGroup", addUserToGroup);
// Delete


export default router;