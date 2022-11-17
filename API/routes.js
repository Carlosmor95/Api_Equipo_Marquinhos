import { Router } from "express";

import {
	getUsers,
	writeUSerData,
	getDataUser, 
	putlogIn,
	createGroup,
	addUserToGroup,
	writeAdminData,
	isAdmin
} from "./controller.js";

const router = Router();

// Get
router.get("/users", getUsers);
router.get("/user", getDataUser);
router.get("/admin", isAdmin);

// Post
router.get("/signIn/user", writeUSerData);
router.get("/signIn/admin", writeAdminData);
router.get("/createGroup", createGroup);


// Put
router.put("/login", putlogIn);
router.get("/addGroup", addUserToGroup);

// Delete


export default router;