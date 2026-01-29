import { useEffect, useState } from "react";
import type { TaskListData, UseTaskResult } from "../../types/taskTypes";
import { addTask, deleteTask, deleteTaskList, fetchTasks, patchTaskDone, patchTaskLabel, patchListTitle, addList, patchNextId } from "../../api/tasksApi";
import { getCreatedLists, getCreatedTaskList, getGoesToList, getList, getRemovedLists, getRemovedTaskList, getTaskDoneList, getUpdatedTaskLabelList, getUpdatedTitleList } from "./tasksHelper";
import { useProjectsContext } from "../../context/projects/projectsContext";
import { useUserContext } from "../../context/users/userContext";

export const useTask = (activeProjectId: number | null): UseTaskResult => {
    const userCtx = useUserContext();
    const [tasks, setTasks] = useState<TaskListData[]>([]);
    const { refreshProjects } = useProjectsContext();

    useEffect(() => { if(activeProjectId != null) fetchTasks(activeProjectId).then((data) => { 
        if (data.error) {
            userCtx.authLogout();
            return;
        }
        setTasks(data)
    })
    }, []);

    const setNewList = (list: TaskListData) => setTasks((prev) => prev.map((t) => (t.id === list.id ? list : t)));

    const updateListOptimistic = async (
    derive: () => TaskListData | undefined,
    persist: (list: TaskListData) => Promise<void | any>) => { 
        const list = derive();
        if(!list) return;
        setNewList(list);
        const res = await persist(list);
        if(res.error){
            userCtx.authLogout();
            return;
        }
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
            const res = await deleteTask(taskId);
            if(res.error){
                userCtx.authLogout();
                return;
            }
            return;
        }

        setNewList(list);
        const res = await patchTaskDone(taskId, done);
        if(res.error){
            list.tasks[taskIndex].done = !list.tasks[taskIndex].done;
            setNewList(list);
            userCtx.authLogout();
        }
    }


    const createTask = async (id: number, label: string) => {
        const result = getCreatedTaskList(id, label, tasks);
        if (!result) return;
        const { list, tempId } = result;
        if (!list) return;
        setNewList(list);

        const res = await addTask(id, label);

        if (res.error) {
            setTasks(prev => prev.map(l => l.id === id ? { ...l, tasks: l.tasks.filter(t => t.id !== tempId) } : l));
            userCtx.authLogout();
            return;
        }
        const realId = Number(res.body.id);
        setTasks(prev => prev.map(l => l.id === id ? { ...l, tasks: l.tasks.map(t => t.id === tempId ? { ...t, id: realId } : t), } : l));
    };


    const createList = async (title: string) => {
        if(activeProjectId === null) return;
        const { lists, id: tempId } = getCreatedLists(title, tasks);
        setTasks(lists);

        const res = await addList(activeProjectId, title);
        if (res.error) {
            userCtx.authLogout();
            setTasks(prev => getRemovedLists(tempId, prev));
            return;
        }
        const realId = Number(res.body.id);
        setTasks(prev => prev.map(l => l.id === tempId ? { ...l, id: realId } : l));
        await refreshProjects();
    }

    const removeList = async (id: number) => {
        setTasks(getRemovedLists(id, tasks));
        await deleteTaskList(id);
        await refreshProjects();
    }
    const removeTask = async (id: number, taskId: number) => updateListOptimistic(() => getRemovedTaskList(id, taskId, tasks), () => deleteTask(taskId));

    const updateTaskLabel = async (id: number, taskId: number, label: string) => { updateListOptimistic(() => getUpdatedTaskLabelList(id, taskId, label, tasks), () => patchTaskLabel(taskId, label)); }
    const updateTitle = (id: number, value: string) =>  updateListOptimistic(() => getUpdatedTitleList(id, value, tasks), () => patchListTitle(id, value));
    const updateGoesTo = async (id: number, nextId: number) => { updateListOptimistic(() => getGoesToList(id, nextId, tasks), () => patchNextId(id, nextId)) };

    return { tasks, updateTaskDone, updateTaskLabel, createTask, removeTask, removeList, updateTitle, createList, updateGoesTo, getGoesTo } as UseTaskResult;
}