import { createTempId } from "../../utils/mathUtils";
import { TaskListData } from "../../types/taskTypes";

export const getIndex = (id: number, tasks: TaskListData[]) => {
    return tasks.findIndex((t) => t.id === id);
};

export const getList = (id: number, tasks: TaskListData[]) => {
    const index = getIndex(id, tasks);
    return index !== -1 ? { ...tasks[index] } : null;
};

export const getTaskIndex = (list: TaskListData, taskId: number) => { return list.tasks.findIndex((t) => t.id === taskId); }

export const getGoesToList = (id: number, nextId: number, tasks: TaskListData[]) => {
    const list = getList(id, tasks);
    if (!list) return;

    list.nextId = nextId === -1 ? undefined : nextId;
    return list;
}

export const getUpdatedTitleList = (id: number, title: string, tasks: TaskListData[]) => {
    const list = getList(id, tasks);
    if (!list) return;
    list.title = title;
    return list;
}

export const getRemovedLists = (id: number, tasks: TaskListData[]) => {
    const lists = [...tasks];
    return lists.filter((task) => task.id != id);
}

export const getRemovedTaskList = (id: number, taskId: number, tasks: TaskListData[]) => {
    const list = getList(id, tasks);
    if (!list) return;
    list.tasks = list.tasks.filter((t) => t.id !== taskId);
    return list;
}

export const getUpdatedTaskLabelList = (id: number, taskId: number, label: string, tasks: TaskListData[]) => {
    const list = getList(id, tasks);
    if (!list) return;
    const taskIndex = getTaskIndex(list, taskId);
    if (taskIndex === -1) return;
    const newTask = { ...list.tasks[taskIndex], label };
    list.tasks[taskIndex] = newTask;
    return list;
}

export const getCreatedLists = (title: string, tasks: TaskListData[]) => {
    const lists = [...tasks];
    const id = createTempId();

    lists.push({ id, title, tasks: [] });
    return { lists, id };
}

export const getCreatedTaskList = (id: number, label: string, tasks: TaskListData[]) => {
    const list = getList(id, tasks);
    const tempId = createTempId();
    if (list) list.tasks.push({ id: tempId, label, done: false });
    return { list, tempId };
}

export const getTaskDoneList = (id: number, taskId: number, done: boolean, tasks: TaskListData[]) => {
    const list = getList(id, tasks);
    if (!list) return;

    const taskIndex = getTaskIndex(list, taskId);
    if (taskIndex === -1) return;

    list.tasks = [...list.tasks];
    list.tasks[taskIndex] = { ...list.tasks[taskIndex], done };
    return { list, taskIndex };
}
