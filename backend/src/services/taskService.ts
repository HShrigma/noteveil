import { tempTasks } from "../model/tasks"; 

class TaskService {
    private taskLists = tempTasks;

    private findListIndex(listId: number) {
        return this.taskLists.findIndex(t => t.id === listId);
    }

    getAllTasks() {
        return this.taskLists;
    }

    deleteTaskList(listId: number) {
        this.taskLists = this.taskLists.filter(list => list.id !== listId);
        return { deletedId: listId };
    }

    deleteTask(listId: number, taskId: number) {
        const index = this.findListIndex(listId);
        if (index === -1) return null; // List not found

        const initialLength = this.taskLists[index].tasks.length;
        this.taskLists[index].tasks = this.taskLists[index].tasks.filter(t => t.id !== taskId);
        
        if (this.taskLists[index].tasks.length === initialLength) return { error: "Task not found" };

        return { deletedId: listId, deletedTaskId: taskId };
    }

    addTaskList(listId: number, title: string) {
        this.taskLists.push({ id: listId, title, tasks: [], nextId: undefined });
        return { listId, title };
    }

    addTask(listId: number, taskId: number, label: string) {
        const index = this.findListIndex(listId);
        if (index === -1) return null; // List not found

        this.taskLists[index].tasks.push({ id: taskId, label: label, done: false });
        return { listId, taskId, label };
    }

    updateNextId(listId: number, nextId: number | undefined) {
        const index = this.findListIndex(listId);
        if (index === -1) return { error: "TaskList not found" };

        if (nextId !== undefined && !this.taskLists.some(list => list.id === nextId)) {
            return { error: "nextId not found" };
        }

        this.taskLists[index].nextId = nextId;
        return { listId, nextId };
    }

    updateTaskDone(listId: number, taskId: number, done: boolean) {
        const listIndex = this.findListIndex(listId);
        if (listIndex === -1) return { error: "TaskList not found" };

        const taskIndex = this.taskLists[listIndex].tasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) return { error: "Task not found" };

        this.taskLists[listIndex].tasks[taskIndex].done = done;
        return { id: listId, taskId, done };
    }

    updateTaskLabel(listId: number, taskId: number, label: string) {
        const listIndex = this.findListIndex(listId);
        if (listIndex === -1) return { error: "TaskList not found" };

        const taskIndex = this.taskLists[listIndex].tasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) return { error: "Task not found" };

        this.taskLists[listIndex].tasks[taskIndex].label = label;
        return { id: listId, label };
    }

    updateListTitle(listId: number, title: string) {
        const index = this.findListIndex(listId);
        if (index === -1) return null;

        this.taskLists[index].title = title;
        return { id: listId, title };
    }
}

export default new TaskService();