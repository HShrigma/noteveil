import { Router } from "express";
import NoteController from "../controllers/noteController";
import { requireBodyFields, runMiddleware, sanitizeInput, validateIdParam } from "../utils/middleware";

const router = Router();
const controller = new NoteController();

// Get notes
router.get("/", (_req, res) => controller.getNotes(_req, res));

// Delete note
router.delete("/:id", runMiddleware({ validateId: true }), (req, res) => controller.deleteNote(req, res));

// Add note
router.post("/", runMiddleware({}), (req, res) => controller.addNote(req, res));

// Update note title
router.patch(
    "/:id/title",
    runMiddleware({validateId:true, bodyFields:["title"]}),
    (req, res) => controller.updateNoteTitle(req, res)
);

// Update note content
router.patch(
    "/:id/content",
    runMiddleware({validateId:true, bodyFields:["content"]}),
    (req, res) => controller.updateNoteContent(req, res)
);

export default router;