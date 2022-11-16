import { Router } from "express";

import {
	getUsers,
	writeUSerData,
	getDataUser, 
	putlogIn,
	createGroup
} from "./controller.js";

const router = Router();

// Get
router.get("/users", getUsers);
router.get("/user", getDataUser);

// Post
router.get("/signIn", writeUSerData);
router.get("/createGroup", createGroup);

// Put
router.put("/login", putlogIn);


// Delete


export default router;