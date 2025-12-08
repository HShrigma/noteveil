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
router.post("/", (req, res) => {
    const {id} = req.body;
    notes.push({ id: id, title: '', content: '' })

    res.json({success:true, newId: id});
});
export default router; 