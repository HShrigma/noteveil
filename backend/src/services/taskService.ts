import TaskRepository from "../repository/taskRepository";

class TaskService {
    repo = new TaskRepository();

    getAllTasks() {
        try {
            return this.repo.getAllTasks();
        } catch (error) {
            console.error('Error fetching taskLists:', error);
            return null;
        }
    }

    deleteTaskList(listId: number) {
        try {
            const res = this.repo.deleteTaskList(listId);
            return { deleted: res.changes > 0, listId: listId };
        } catch (error) {
            console.error('Error deleting TaskList:', error);
            return null;
        }
    }

    deleteTask(taskId: number) {
        try {
            const res = this.repo.deleteTask(taskId);
            return { deleted: res.changes > 0, taskId: taskId };
        } catch (error) {
            console.error('Error deleting Task:', error);
            return null;
        }
    }

    addTaskList(title: string) {
        try {
            const res = this.repo.addTaskList(title);
            return { id: res.lastInsertRowid as number };
        } catch (error) {
            console.error('Error adding TaskList:', error);
            return null;
        }
    }

    addTask(listId: number, label: string) {
        try {
            const res = this.repo.addTask(listId, label);
            return { id: res.lastInsertRowid as number };
        } catch (error) {
            console.error('Error adding Task:', error);
            return null;
        }
    }

    updateNextId(listId: number, nextId: number | undefined) {
        try {
            const res = this.repo.updateNextId(listId, nextId);
            return { updated: res.changes > 0, listId: listId, nextId: nextId };
        } catch (error) {
            console.error('Error updating TaskList NextId:', error);
            return null;
        }
    }

    updateTaskDone(taskId: number, done: boolean) {
        try {
            const res = this.repo.updateTaskDone(taskId, done);
            return { updated: res.changes > 0, taskId: taskId, done: done };
        } catch (error) {
            console.error('Error updating Task Done:', error);
            return null;
        }
    }

    updateTaskLabel(taskId: number, label: string) {
        try {
            const res = this.repo.updateTaskLabel(taskId, label);
            return { updated: res.changes > 0, taskId: taskId, label: label };
        } catch (error) {
            console.error('Error updating Task Label:', error);
            return null;
        }
    }

    updateListTitle(listId: number, title: string) {
        try {
            const res = this.repo.updateListTitle(listId, title);
            return { updated: res.changes > 0, listId: listId, title: title };
        } catch (error) {
            console.error('Error updating TaskList Title:', error);
            return null;
        }
    }
}

export default new TaskService();