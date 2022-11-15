import { Router } from "express";

import {
	getUsers
} from "./controller.js";

const router = Router();

// Get
router.get("/users", getUsers);

// Post


// Pull


// Delete


export default router;