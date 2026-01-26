import { Router } from "express";
import { runMiddleware } from "../utils/middleware";
import  UserController  from "../controllers/userController";
import ProjectController from "../controllers/projectController";

const router = Router();
// ------------------ OWN ---------------

// Refresh
router.post("/auth/refresh", runMiddleware({auth:true}), (_req, res) => UserController.refreshUser(_req, res));

// Get/Create with Google
router.post("/auth/google", runMiddleware({}), (_req, res) => UserController.authenticateWithGoogle(_req, res));

// Register User
router.post("/auth/register", runMiddleware({ bodyFields: ["email", "name", "password"] }), (_req, res) => UserController.register(_req, res));

// Get emails
router.post("/verify", runMiddleware({bodyFields:["email"]}), (_req, res) => UserController.fetchUser(_req, res));

// Get User
router.post("/login", runMiddleware({bodyFields:["email", "password"]}), (_req, res) => UserController.fetchUser(_req, res));

// Delete User
router.post("/logout", runMiddleware({}), (_req, res) => UserController.logout(_req, res));

// Delete User
router.delete("/delete", runMiddleware({bodyFields:["id"]}), (_req, res) => UserController.deleteUser(_req, res));

// Patch User
router.patch("/", runMiddleware({ bodyFields: ["key"] }), (_req, res) => UserController.updateUser(_req, res));
// ------------------ SHARED ---------------

// Get Projects
router.post("/projects/get", runMiddleware({ auth: true }), 
    (_req, res) => ProjectController.getProjects(_req, res));

// Add Project
router.post("/projects/add", runMiddleware({ auth: true, bodyFields: ["title"] }), 
    (_req, res) => ProjectController.addProject(_req, res));

export default router;