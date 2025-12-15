import DB from "../config/db";
import { tableType } from "../config/schema";
import { RawJoinTaskList, TaskList } from "../models/tasks";
import { deleteWithId, runTaskDoneUpdate, runTaskLabelUpdate, runTaskListNextIdUpdate, runTaskListTitleUpdate, updateSingularById } from "../utils/repository";

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

        return Array.from(taskListMap.values());
    }

    deleteTaskList(listId: number) { return deleteWithId(this.db, listId, tableType.taskLists); }
    deleteTask(taskId: number) { return deleteWithId(this.db, taskId, tableType.tasks); }

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

    updateNextId(listId: number, nextId: number | undefined) { return runTaskListNextIdUpdate(this.db, nextId, listId); }
    updateListTitle(listId: number, title: string) { return runTaskListTitleUpdate(this.db, title, listId); }

    updateTaskDone(taskId: number, done: boolean) { return runTaskDoneUpdate(this.db, done, taskId); }
    updateTaskLabel(taskId: number, label: string) {return runTaskLabelUpdate(this.db, label, taskId);}

}

export default TaskRepository;