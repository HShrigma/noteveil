import { tempNotes } from "../model/notes";
import { Request, Response } from "express";
import { sendEmptyError, sendNotFoundError, sendSuccess } from "../utils/messages";

export class NoteController {
    notes = tempNotes;

    public getNotes = (req:Request, res:Response) => {
        res.json(this.notes);
    }

    public deleteNote = (req:Request, res:Response) => {
        const id = Number(req.params.id);
        this.notes = this.notes.filter(note => note.id !== id);
        res.json(sendSuccess({ id: id }));
    }

    public addNote = (req:Request, res:Response) => {
        const id = Number(req.params.id);
        this.notes.push({ id: id, title: '', content: '' })

        res.json(sendSuccess({ id: id }));
    }

    public updateNoteTitle = (req:Request, res:Response) => {
        const id = Number(req.params.id);
        const index = this.notes.findIndex(t => t.id === id);
        if (index === -1) return sendNotFoundError(res, "Note");

        const { title } = req.body;
        this.notes[index].title = title;

        res.json(sendSuccess({ id: id, title: title }));
    }

    public updateNoteContent = (req:Request, res:Response) => {
        const id = Number(req.params.id);
        const index = this.notes.findIndex(t => t.id === id);
        if (index === -1) return sendNotFoundError(res, "Note");
        
        const { content } = req.body;
        this.notes[index].content = content;

        res.json(sendSuccess({ id: id, content: content }));
    }
};

export default NoteController;