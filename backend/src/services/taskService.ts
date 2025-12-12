import DB from "../config/db";
import { RawJoinTaskList, Task, TaskList } from "../models/tasks";

class TaskService {
    db = DB.getInstance().getConnection();

    getAllTasks() {
        try {
            const stmt = this.db.prepare(`
                SELECT l.id AS list_id, l.title AS list_title, l.next_id AS next_id,
                       t.id AS task_id, t.label AS task_label, t.done AS task_done
                FROM task_lists l
                LEFT JOIN tasks t ON l.id = t.task_list_id
                ORDER BY l.created_at, t.created_at, t.id`);
            const rows = stmt.all() as RawJoinTaskList[];
            const taskListMap = new Map<number, TaskList>();
            rows.forEach(row => {
                const listId = row.list_id;
                if (!taskListMap.has(listId)) {
                    taskListMap.set(listId, {
                        id: listId,
                        title: row.list_title,
                        tasks: [],
                        nextId: row.next_id || undefined
                    });
                }
                if (row.task_id !== null && row.task_label !== null) {
                    const taskList = taskListMap.get(listId)!;
                    taskList.tasks.push({
                        id: row.task_id,
                        label: row.task_label,
                        done: Boolean(row.task_done)
                    });
                }
            });

            console.log(taskListMap);
            return Array.from(taskListMap.values());
        } catch (error) {
            console.error('Error fetching taskLists:', error);
            return null;
        }
    }

    deleteTaskList(listId: number) {
        try {
            const stmt = this.db.prepare(`DELETE FROM task_lists WHERE id = ?`);
            const result = stmt.run(listId);
            return { deleted: result.changes > 0, listId: listId };
        } catch (error) {
            console.error('Error deleting TaskList:', error);
            return null;
        }
    }

    deleteTask(taskId: number) {
        try {
            const stmt = this.db.prepare(`DELETE FROM tasks WHERE id = ?`);
            const result = stmt.run(taskId);
            return { deleted: result.changes > 0, taskId: taskId };
        } catch (error) {
            console.error('Error deleting Task:', error);
            return null;
        }
    }

    addTaskList(title: string) {
        try {
            const stmt = this.db.prepare(`INSERT INTO task_lists (title) VALUES (?)`);
            const result = stmt.run(title);
            return { id: result.lastInsertRowid as number };
        } catch (error) {
            console.error('Error adding TaskList:', error);
            return null;
        }
    }

    addTask(listId: number, label: string) {
        try {
            const stmt = this.db.prepare(`INSERT INTO tasks (label, task_list_id) VALUES (?,?)`);
            const result = stmt.run(label, listId);
            return { id: result.lastInsertRowid as number };
        } catch (error) {
            console.error('Error adding Task:', error);
            return null;
        }
    }

    updateNextId(listId: number, nextId: number | undefined) {
        try {
            const stmt = this.db.prepare(`UPDATE task_lists SET next_id = ? WHERE id = ?`);
            const result = stmt.run(nextId, listId);

            return { updated: result.changes > 0, listId: listId, nextId: nextId };

        } catch (error) {
            console.error('Error updating TaskList NextId:', error);
            return null;
        }
    }

    updateTaskDone(taskId: number, done: boolean) {
        try {
            const stmt = this.db.prepare(`UPDATE tasks SET done = ? WHERE id = ?`);
            const result = stmt.run(done ? 1 : 0, taskId);

            return { updated: result.changes > 0, taskId: taskId, done: done };

        } catch (error) {
            console.error('Error updating Task Done:', error);
            return null;
        }
    }

    updateTaskLabel(taskId: number, label: string) {
        try {
            const stmt = this.db.prepare(`UPDATE tasks SET label = ? WHERE id = ?`);
            const result = stmt.run(label, taskId);

            return { updated: result.changes > 0, taskId: taskId, label: label };

        } catch (error) {
            console.error('Error updating Task Label:', error);
            return null;
        }
    }

    updateListTitle(listId: number, title: string) {
        try {
            const stmt = this.db.prepare(`UPDATE task_lists SET title = ? WHERE id = ?`);
            const result = stmt.run(title, listId);

            return { updated: result.changes > 0, listId: listId, title: title };

        } catch (error) {
            console.error('Error updating TaskList Title:', error);
            return null;
        }
    }
}

export default new TaskService();