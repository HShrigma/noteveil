import TaskRepository from "../repository/taskRepository";
import { runService } from "../utils/service";

class TaskService {
    repo = new TaskRepository();

    getAllTasks(projectId: number) {
        return runService(() => this.repo.getAllTasks(projectId), 'Error fetching taskLists:');
    }

    deleteTaskList(listId: number) {
        const res = runService(() => this.repo.deleteTaskList(listId), 'Error deleting TaskList:');
        return res ? { deleted: res.changes > 0, listId: listId } : null;
    }

    deleteTask(taskId: number) {
        const res = runService(() => this.repo.deleteTask(taskId), 'Error deleting Task:');
        return res ? { deleted: res.changes > 0, taskId: taskId } : null;
    }

    addTaskList(projectId: number, title: string) {
        const res = runService(() => this.repo.addTaskList(projectId, title), 'Error adding TaskList:');
        return res ? { id: res.lastInsertRowid as number } : null;
    }

    addTask(listId: number, label: string) {
        const res = runService(() => this.repo.addTask(listId, label), 'Error adding Task:');
        return res ? { id: res.lastInsertRowid as number } : null;
    }

    updateNextId(listId: number, nextId: number | undefined) {
        const res = runService(() => this.repo.updateNextId(listId, nextId), 'Error updating TaskList NextId:');
        return res ? { updated: res.changes > 0, listId: listId, nextId: nextId } : null;
    }

    updateTaskDone(taskId: number, done: boolean) {
        const res = runService(() => this.repo.updateTaskDone(taskId, done), 'Error updating Task Done:');
        return res ? { updated: res.changes > 0, taskId: taskId, done: done } : null;
    }

    updateTaskLabel(taskId: number, label: string) {
        const res = runService(() => this.repo.updateTaskLabel(taskId, label), 'Error updating Task Label:');
        return res ? { updated: res.changes > 0, taskId: taskId, label: label } : null;
    }

    updateListTitle(listId: number, title: string) {
        const res = runService(() => this.repo.updateListTitle(listId, title), 'Error updating TaskList Title:');
        return res ? { updated: res.changes > 0, listId: listId, title: title } : null;
    }
}

export default new TaskService();