import { Router } from "express";
import { tempNotes } from "../model/notes";
import { sendEmptyError, sendNotFoundError, sendSuccess } from "../utils/messages";

const router = Router();

let notes = tempNotes;

router.get("/", (_req, res) => {
    res.json(notes);
});

// Delete note
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    notes = notes.filter(note => note.id !== id);

    console.log("deleting by id: " + id);
    
    res.json(sendSuccess({id}));
});

// Add note
router.post("/:id", (req, res) => {

    const id = Number(req.params.id);
    notes.push({ id: id, title: '', content: '' })


    res.json(sendSuccess({id}));
});

// Update note title
router.patch("/:id/title", (req,res) => {
    const id = Number(req.params.id);
    const index = notes.findIndex(t => t.id === id);
    if (index === -1) return sendNotFoundError(res, "Note");

    const {title} = req.body;
    if (!title) return sendEmptyError(res, "title");

    notes[index].title = title;

    
    res.json(sendSuccess({id: id, body: req.body}));
});

// Update note content
router.patch("/:id/content", (req,res) => {
    const id = Number(req.params.id);
    const index = notes.findIndex(t => t.id === id);
    if (index === -1) return sendNotFoundError(res, "Note");

    const {content} = req.body;
    if (!content) return sendEmptyError(res, "Content");

    notes[index].content = content;

    res.json(sendSuccess(req.body));
});

export default router; 