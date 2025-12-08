import { Router } from "express";
import { tempTasks } from "../data/tasks";

const router = Router();

router.get("/", (_req, res) => {
    res.json(tempTasks);
});

export default router;