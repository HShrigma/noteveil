import { Router } from "express";
import { tempNotes } from "../data/notes";

const router = Router();

router.get("/", (_req, res) => {
    res.json(tempNotes);
});

export default router;