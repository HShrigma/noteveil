import { useState } from "react";
import type { TaskActivity } from "../../types/taskTypes";
import { discardMsgTask, discardMsgTaskAdder, discardMsgTaskBottomBar, discardMsgTaskTitle, } from "../../utils/registries";
import { getIndex, getTaskIndex } from "./tasksHelper";
import { tryCancelDiscard } from "../../utils/activityHelper";
import type { TaskListData } from "../../types/taskTypes"; 

export const useTaskActivity = (tasks: TaskListData[]) => {
    const [activeTask, setActiveTask] = useState<TaskActivity>(null);

    const getPredicateForActiveTask = (): boolean => {
        if (!activeTask) return false;

        if (activeTask.type === "task" || activeTask.type === "title") {
            const list = tasks[getIndex(activeTask.listId, tasks)];
            if (!list) return false;

            if (activeTask.type === "title") {
                return activeTask.value.trim() !== list.title.trim();
            }

            const task = list.tasks[getTaskIndex(list, activeTask.taskId)];
            if (!task) return false;

            return activeTask.value.trim() !== task.label.trim();
        }

        return (
            activeTask.type !== "goesTo" &&
            activeTask.value.trim() !== ""
        );
    };

    const getDiscardMsgForActiveTask = (): string => {
        switch (activeTask?.type) {
            case "adder":
                return discardMsgTaskAdder;
            case "bottomBar":
                return discardMsgTaskBottomBar;
            case "task":
                return discardMsgTask;
            case "title":
                return discardMsgTaskTitle;
            default:
                console.error(`No discard message for type ${activeTask ? activeTask.type : "none"}`);
                return "";
        }
    };

    const requestActivity = (req: TaskActivity) => {
        if (activeTask === null || req === null) {
            setActiveTask(req);
            return;
        }

        if (activeTask.type === "adder" && req.type === "adder") {
            setActiveTask(req);
            return;
        }

        if (activeTask.type !== "adder" && activeTask.type !== "task" && activeTask.type === req.type && activeTask.listId === req.listId) {
            setActiveTask(req);
            return;
        }

        if (activeTask.type === "goesTo") {
            setActiveTask(req);
            return;
        }

        if (
            activeTask.type === "task" &&
            req.type === "task" &&
            activeTask.listId === req.listId &&
            activeTask.taskId === req.taskId
        ) {
            setActiveTask(req);
            return;
        }

        const shouldCancel = tryCancelDiscard(getPredicateForActiveTask(), getDiscardMsgForActiveTask());

        if (shouldCancel) return;
        setActiveTask(req);
    };

    return {
        activeTask,
        requestActivity,
        clearActivity: () => setActiveTask(null),
        isActive: (type: string) => activeTask?.type === type,
    };
};
