import { Router } from "express";
import NoteController from "../controllers/noteController";
import { requireBodyFields } from "../utils/middleware";

const router = Router();
const controller = new NoteController();

// Get notes
router.get("/", (_req, res) => controller.getNotes(_req, res));

// Delete note
router.delete("/:id", (req, res) => controller.deleteNote(req, res));

// Add note
router.post("/:id", (req, res) => controller.addNote(req, res));

// Update note title
router.patch("/:id/title", requireBodyFields(["title"]), (req, res) => controller.updateNoteTitle(req, res));

// Update note content
router.patch("/:id/content", requireBodyFields(["content"]), (req, res) => controller.updateNoteContent(req, res));

export default router;