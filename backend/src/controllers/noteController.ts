import { Request, Response } from "express";
import { sendError, sendNotFoundError, sendSuccess } from "../utils/messages";
import  NoteService  from "../services/noteService";

export class NoteController {

    public getNotes = (req:Request, res:Response) => {
        const result = NoteService.getAllNotes();
        if (result === null) return sendError(res, 500, "Could not fetch Notes");
        res.json(result);
    }

    public deleteNote = (req:Request, res:Response) => {
        const id = Number(req.params.id);
        const result = NoteService.deleteNote(id);

        if (result === null) return sendError(res, 500, "Could not delete Note");
        if (!result.deleted) return sendNotFoundError(res, "Note");

        res.json(sendSuccess(result));
    }

    public addNote = (req:Request, res:Response) => {
        const result = NoteService.addNote();
        if (result === null) return sendError(res, 500, "Could not add Note");
        res.json(sendSuccess(result));
    }

    public updateNoteTitle = (req:Request, res:Response) => {
        const id = Number(req.params.id);
        const {title} = req.body;
        
        const result = NoteService.updateNoteTitle(id,title);

        if (!result?.updated) return sendNotFoundError(res, "Note");
        if (result === null) return sendError(res, 500, "Could not update Note title");

        res.json(sendSuccess(result));
    }

    public updateNoteContent = (req:Request, res:Response) => {
        const id = Number(req.params.id);
        const { content } = req.body;

        const result = NoteService.updateNoteContent(id,content);

        if (!result?.updated) return sendNotFoundError(res, "Note");
        if (result === null) return sendError(res, 500, "Could not update Note content");

        res.json(sendSuccess(result));
    }
};

export default NoteController;