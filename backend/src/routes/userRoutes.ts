import { Router } from "express";
import TaskController from "../controllers/taskController";
import NoteController from "../controllers/noteController";
import { runMiddleware } from "../utils/middleware";
import  UserController  from "../controllers/projectController";

const router = Router();
// ------------------ OWN ---------------

// Get Users
// router.get("/", runMiddleware({}), (_req, res) => UserController.getUsers(_req, res));

// Delete User
// router.delete("/:id", runMiddleware({}), (_req, res) => UserController.deleteUser(_req, res));

// Add User
// router.post("/", runMiddleware({}), (_req, res) =>  UserController.addUser(_req,res) );

// Patch User
// router.patch("/:id", runMiddleware({}), (_req, res) => UserController.updateUserTitle(_req,res));

export default router;