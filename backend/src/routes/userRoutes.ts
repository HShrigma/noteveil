import { Router } from "express";
import { runMiddleware } from "../utils/middleware";
import  UserController  from "../controllers/userController";

const router = Router();
// ------------------ OWN ---------------
// Get Users
router.get("/:id", runMiddleware({idFields:["id"]}), (_req, res) => UserController.getUser(_req, res));

// Delete User
router.delete("/:id", runMiddleware({idFields:["id"]}), (_req, res) => UserController.deleteUser(_req, res));

// Add User
router.post("/", runMiddleware({ bodyFields: ["email", "userName", "password"] }), (_req, res) => UserController.addUser(_req, res));

// Patch User
router.patch("/:id", runMiddleware({}), (_req, res) => UserController.updateUser(_req,res));

// ------------------ SHARED ---------------

export default router;