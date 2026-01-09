import { Router } from "express";
import NoteController from "../controllers/noteController";
import { runMiddleware } from "../utils/middleware";

const router = Router();

// Delete note
router.delete("/:id", runMiddleware({ idFields: ["id"] }), (req, res) => NoteController.deleteNote(req, res));

// Update note title
router.patch(
    "/:id/title",
    runMiddleware({ idFields: ["id"], bodyFields: ["title"] }),
    (req, res) => NoteController.updateNoteTitle(req, res)
);

// Update note content
router.patch(
    "/:id/content",
    runMiddleware({ idFields: ["id"], bodyFields: ["content"] }),
    (req, res) => NoteController.updateNoteContent(req, res)
);

export default router;