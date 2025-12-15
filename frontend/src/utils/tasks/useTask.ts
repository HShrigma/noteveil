import { useEffect, useState } from "react";
import { TaskListData } from "../types";
import { addTask, deleteTask, deleteTaskList, fetchTasks, patchTaskDone, patchTaskLabel, patchListTitle, addList, patchNextId } from "../../api/tasksApi";

export const useTask = () => {
    const [tasks, setTasks] = useState<TaskListData[]>([]);

    useEffect(() => {
        fetchTasks().then((data) => setTasks(data));
    }, []);

    const setNewList = (list: TaskListData) => setTasks((prev) => prev.map((t) => (t.id === list.id ? list : t)));
    const findTaskIndex = (list: TaskListData, taskId: number) => { return list.tasks.findIndex((t) => t.id === taskId); }
    const getTaskListIndexById = (id: number) => {
        return tasks.findIndex((t) => t.id === id);
    };
    const getList = (id: number) => {
        const index = getTaskListIndexById(id);
        return index !== -1 ? { ...tasks[getTaskListIndexById(id)] } : null;
    };

    const updateTaskDone = async(id: number, taskId: number, done: boolean) => {
        const list = getList(id);
        if(!list) return;

        const taskIndex = findTaskIndex(list, taskId);

        if (taskIndex === -1) return;
        const newTask = { ...list.tasks[taskIndex], done };
        list.tasks[taskIndex] = newTask;

        // move to next list if nextId set
        if (list.nextId && done) {
            await createTask(list.nextId, newTask.label);
            await removeTask(list.id, taskId);
            return;
        }

        setNewList(list);
        await patchTaskDone(taskId, done);
    }

    const updateTaskLabel = async (id: number, taskId: number, label: string) => {
        const list = getList(id);
        if (!list) return;
        const taskIndex = findTaskIndex(list, taskId);

        if (taskIndex === -1) return;

        const newTask = { ...list.tasks[taskIndex], label };
        list.tasks[taskIndex] = newTask;

        setNewList(list);

        await patchTaskLabel(taskId, label);

    }

    const createTask = async (id: number, label: string) => {
        const res = await addTask(id, label);
        if (!res.success) return;

        const list = getList(id);
        if (!list) return;

        const newId = Number(res.body.id);
        list.tasks.push({ id: newId, label, done: false });
        setNewList(list);

    }

    const removeTask = async (id: number, taskId: number) => {
        const list = getList(id);
        if (!list) return;
        
        list.tasks = list.tasks.filter((t) => t.id !== taskId);
        setNewList(list);

        await deleteTask(taskId);
    }

    const removeList = async (id: number) => {
        const newTasks = [...tasks];
        setTasks(newTasks.filter((task) => task.id != id));
        await deleteTaskList(id);
    }
    const updateTitle = async (id: number, value: string) => {
        const list = getList(id);
        if(!list) return;

        list.title = value;
        setNewList(list);

        await patchListTitle(id, value);
    };

    const createList = async(title: string) => {
        const newTasks = [...tasks];
        const res = await addList(title);

        if (!res.success) return;
        const newId = Number(res.body.id);

        newTasks.push({ id: newId, title, tasks: [] });
        setTasks(newTasks);
    }

    const updateGoesTo = async (id: number, nextId: number) => {
        const list = getList(id);
        if(!list) return;

        list.nextId = nextId === -1 ? undefined : nextId;
        setNewList(list);

        await patchNextId(id, list.nextId);
    };
    
    const getGoesTo = (id: number | undefined) => {
        const list = getList(id ?? -1);
        if(!list) return '';
        return list.title;
    };
    return { allTasks: tasks, updateTaskDone, updateTaskLabel, createTask, removeTask, removeList, updateTitle, createList, updateGoesTo, getGoesTo};
}
