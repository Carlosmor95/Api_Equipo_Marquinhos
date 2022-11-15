import { Router } from "express";

import {
	getUsers,
	writeUSerData,
	getDataUser
} from "./controller.js";

const router = Router();

// Get
router.get("/users", getUsers);
router.get("/user", getDataUser);

// Post
router.get("/signIn", writeUSerData);

// Put


// Delete


export default router;