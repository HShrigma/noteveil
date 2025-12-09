import { Router } from "express";
import { tempNotes } from "../data/notes";

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
    res.json({success:true, deletedId: id});
});

// Add note
router.post("/:id", (req, res) => {

    const id = Number(req.params.id);
    notes.push({ id: id, title: '', content: '' })

    res.json({success:true, newId: id});
});

// Update note title
router.patch("/:id/title", (req,res) => {
    const id = Number(req.params.id);
    const index = notes.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ success: false, error: "TaskList not found" });

    const {title} = req.body;
    if (!title) return res.status(404).json({ success: false, error: "Cannot set empty title" });

    notes[index].title = title;

    res.json({success:true, id, title});
});

// Update note content
router.patch("/:id/content", (req,res) => {
    const id = Number(req.params.id);
    const index = notes.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ success: false, error: "TaskList not found" });

    const {content} = req.body;
    if (!content) return res.status(404).json({ success: false, error: "Cannot set empty content" });

    notes[index].content = content;

    res.json({success:true, id, title: content});
});

export default router; 