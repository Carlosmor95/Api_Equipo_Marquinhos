import { Router } from "express";

import {
	getUsers
} from "./controller.js";

const router = Router();

// Get
router.get("/users", getUsers);

// Post


// Put


// Delete


export default router;