import { tempNotes } from "../model/notes";
import { Request, Response } from "express";
import { sendEmptyError, sendNotFoundError, sendSuccess } from "../utils/messages";
import { validateResourceAndProperty } from "../utils/controllerHelpers";
import { title } from "process";

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

        const { index, item, error } = validateResourceAndProperty(req, res, id, this.notes, "Note", "title");
        if(error !== undefined) return error;

        this.notes[index].title = item;

        res.json(sendSuccess({ id: id, title: item }));
    }

    public updateNoteContent = (req:Request, res:Response) => {
        const id = Number(req.params.id);

        const { index, item, error } = validateResourceAndProperty(req, res, id, this.notes, "Note", "content");
        if (error !== undefined) return error;

        this.notes[index].content = item;
        res.json(sendSuccess({ id: id, content: item }));
    }
};

export default NoteController;