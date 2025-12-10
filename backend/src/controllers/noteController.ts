import { Request, Response } from "express";
import { sendNotFoundError, sendSuccess } from "../utils/messages";
import { NoteService } from "../services/noteService";
import NoteServiceInstance from "../services/noteService";

export class NoteController {
    private service = NoteServiceInstance;

    public getNotes = (req:Request, res:Response) => {
        res.json((this.service.getAllNotes()));
    }

    public deleteNote = (req:Request, res:Response) => {
        const id = Number(req.params.id);
        res.json(sendSuccess(this.service.deleteNote(id)));
    }

    public addNote = (req:Request, res:Response) => {
        const id = Number(req.params.id);
        res.json(sendSuccess(this.service.addNote(id)));
    }

    public updateNoteTitle = (req:Request, res:Response) => {
        const id = Number(req.params.id);
        const {title} = req.body;
        
        const result = this.service.updateNoteTitle(id,title);
        if (result === null) return sendNotFoundError(res, "Note");

        res.json(sendSuccess(result));
    }

    public updateNoteContent = (req:Request, res:Response) => {
        const id = Number(req.params.id);
        const { content } = req.body;

        const result = this.service.updateNoteContent(id,content);
        if (result === null) return sendNotFoundError(res, "Note");

        res.json(sendSuccess(result));
    }
};

export default NoteController;