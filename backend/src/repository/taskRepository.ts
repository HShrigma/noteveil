import DB from "../config/db";
import { RawJoinTaskList, TaskList } from "../models/tasks";

class TaskRepository {
    db = DB.getInstance().getConnection();

    getAllTasks() {
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
    }

    deleteTaskList(listId: number) {
        const stmt = this.db.prepare(`DELETE FROM task_lists WHERE id = ?`);
        const result = stmt.run(listId);

        return result;
    }

    deleteTask(taskId: number) {
        const stmt = this.db.prepare(`DELETE FROM tasks WHERE id = ?`);
        const result = stmt.run(taskId);

        return result;
    }

    addTaskList(title: string) {
        const stmt = this.db.prepare(`INSERT INTO task_lists (title) VALUES (?)`);
        const result = stmt.run(title);

        return result;
    }

    addTask(listId: number, label: string) {
        const stmt = this.db.prepare(`INSERT INTO tasks (label, task_list_id) VALUES (?,?)`);
        const result = stmt.run(label, listId);
        return result;
    }

    updateNextId(listId: number, nextId: number | undefined) {
        const stmt = this.db.prepare(`UPDATE task_lists SET next_id = ? WHERE id = ?`);
        const result = stmt.run(nextId, listId);

        return result;
    }

    updateTaskDone(taskId: number, done: boolean) {
        const stmt = this.db.prepare(`UPDATE tasks SET done = ? WHERE id = ?`);
        const result = stmt.run(done ? 1 : 0, taskId);

        return result;
    }

    updateTaskLabel(taskId: number, label: string) {
        const stmt = this.db.prepare(`UPDATE tasks SET label = ? WHERE id = ?`);
        const result = stmt.run(label, taskId);
        return result;
    }


    updateListTitle(listId: number, title: string) {
        const stmt = this.db.prepare(`UPDATE task_lists SET title = ? WHERE id = ?`);
        const result = stmt.run(title, listId);
        return result;
    }
}

export default TaskRepository;