import { useEffect, useState } from "react";
import { TaskListData, UseTaskResult } from "./taskTypes";
import { addTask, deleteTask, deleteTaskList, fetchTasks, patchTaskDone, patchTaskLabel, patchListTitle, addList, patchNextId } from "../../api/tasksApi";
import { getCreatedLists, getCreatedTaskList, getGoesToList, getIndex, getList, getRemovedLists, getRemovedTaskList, getTaskDoneList, getTaskIndex, getUpdatedTaskLabelList, getUpdatedTitleList } from "./tasksHelper";

export const useTask = (): UseTaskResult => {
    const [tasks, setTasks] = useState<TaskListData[]>([]);

    useEffect(() => { fetchTasks().then((data) => setTasks(data)) }, []);

    const setNewList = (list: TaskListData) => setTasks((prev) => prev.map((t) => (t.id === list.id ? list : t)));

    const updateListOptimistic = async (
    derive: () => TaskListData | undefined,
    persist: (list: TaskListData) => Promise<void>) => { 
        const list = derive();
        if(!list) return;
        setNewList(list);
        await persist(list);
    }
    const getGoesTo = (id: number | undefined) => {
        const list = getList(id ?? -1, tasks);
        if (!list) return '';
        return list.title;
    };

    const updateTaskDone = async (id: number, taskId: number, done: boolean) => {
        const result = getTaskDoneList(id, taskId, done, tasks);
        if(!result) return;
        const {list, taskIndex} = result;

        const taskLabel = list.tasks[taskIndex].label;
        if (list.nextId && done) {
            setNewList({...list, tasks: list.tasks.filter(t => t.id !== taskId)});
            await createTask(list.nextId, taskLabel);
            await deleteTask(taskId);
            return;
        }

        setNewList(list);
        await patchTaskDone(taskId, done);
    }


    const createTask = async (id: number, label: string) => {
        const result = getCreatedTaskList(id, label, tasks);
        if (!result) return;
        const { list, tempId } = result;
        if (!list) return;
        setNewList(list);

        const res = await addTask(id, label);

        if (!res.success) {
            setTasks(prev => prev.map(l => l.id === id ? { ...l, tasks: l.tasks.filter(t => t.id !== tempId) } : l));
            return;
        }
        const realId = Number(res.body.id);
        setTasks(prev => prev.map(l => l.id === id ? { ...l, tasks: l.tasks.map(t => t.id === tempId ? { ...t, id: realId } : t), } : l));
    };


    const createList = async (title: string) => {
        const { lists, id: tempId } = getCreatedLists(title, tasks);
        setTasks(lists);

        const res = await addList(title);

        if (!res.success) {
            setTasks(prev => getRemovedLists(tempId, prev));
            return;
        }
        const realId = Number(res.body.id);
        setTasks(prev => prev.map(l => l.id === tempId ? { ...l, id: realId } : l));
    }

    const removeList = async (id: number) => {
        setTasks(getRemovedLists(id, tasks));
        await deleteTaskList(id);
    }
    const removeTask = async (id: number, taskId: number) => updateListOptimistic(() => getRemovedTaskList(id, taskId, tasks), () => deleteTask(taskId));

    const updateTaskLabel = async (id: number, taskId: number, label: string) => { updateListOptimistic(() => getUpdatedTaskLabelList(id, taskId, label, tasks), () => patchTaskLabel(taskId, label)); }
    const updateTitle = (id: number, value: string) =>  updateListOptimistic(() => getUpdatedTitleList(id, value, tasks), () => patchListTitle(id, value));
    const updateGoesTo = async (id: number, nextId: number) => { updateListOptimistic(() => getGoesToList(id, nextId, tasks), () => patchNextId(id, nextId)) };

    return { tasks, updateTaskDone, updateTaskLabel, createTask, removeTask, removeList, updateTitle, createList, updateGoesTo, getGoesTo } as UseTaskResult;
}