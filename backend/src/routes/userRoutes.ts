import { Router } from "express";
import { runMiddleware } from "../utils/middleware";
import  UserController  from "../controllers/userController";
import ProjectController from "../controllers/projectController";

const router = Router();
// ------------------ OWN ---------------
// Get User
router.get("/", runMiddleware({bodyFields:["email", "password"]}), (_req, res) => UserController.getUser(_req, res));

// Delete User
router.delete("/:id", runMiddleware({idFields:["id"]}), (_req, res) => UserController.deleteUser(_req, res));

// Add User
router.post("/", runMiddleware({ bodyFields: ["email", "userName", "password"] }), (_req, res) => UserController.addUser(_req, res));

// Patch User
router.patch("/:id", runMiddleware({ idFields: ["id"], bodyFields: ["key", "value"] }), (_req, res) => UserController.updateUser(_req, res));

// ------------------ SHARED ---------------

// Get Projects
router.get("/:id/projects", runMiddleware({idFields:["id"]}), 
    (_req, res) => ProjectController.getProjects(_req, res));

// Add Project
router.post("/:id/projects", runMiddleware({ idFields: ["id"], bodyFields: ["title"] }), 
    (_req, res) => ProjectController.addProject(_req, res));

export default router;