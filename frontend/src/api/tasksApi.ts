import { CORE_URL, PROJECTS_URL } from "./apiUtils";
const BASE_URL = `${CORE_URL}/tasks`;
const getProjectUrl = (projectId: number) => `${PROJECTS_URL}/${projectId}/tasks`;

export const fetchTasks = async (activeProjectId: number) => {
    const res = await fetch(getProjectUrl(activeProjectId));
    return res.json();
};

export async function deleteTaskList(id: number) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    });

    if (!res.ok) throw new Error("Failed to delete taskList");

    return await res.json();
}

export async function deleteTask(taskId: number) {
    const res = await fetch(`${BASE_URL}/task/${taskId}`, {
        method: "DELETE"
    });

    if (!res.ok) throw new Error("Failed to delete task");

    return await res.json();
}


export async function addList( activeProjectId: number, title: string) {
    const res = await fetch(getProjectUrl(activeProjectId), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title })
    })

    if (!res.ok) throw new Error("Failed to add new taskList");

    return await res.json();
}

export async function addTask(id: number, label: string) {
    const res = await fetch(`${BASE_URL}/${id}/task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            label: label
        })
    })

    if (!res.ok) throw new Error("Failed to add new task");

    return await res.json();
}

export async function patchNextId(id:number, nextId: number | undefined){
    const res = await fetch(`${BASE_URL}/${id}/next`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nextId: nextId
        })
    })

    if (!res.ok) throw new Error("Couldn't patch next Id");

    return await res.json();

}

export async function patchTaskDone(taskId: number, done: boolean) {
    const res = await fetch(`${BASE_URL}/task/${taskId}/done`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            done: done
        })
    })

    if (!res.ok) throw new Error("Couldn't patch task done");

    return await res.json();

}

export async function patchTaskLabel(taskId: number, label: string) {
    const res = await fetch(`${BASE_URL}/task/${taskId}/label`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            label: label
        })
    })

    if (!res.ok) throw new Error("Couldn't patch task label");

    return await res.json();

}

export async function patchListTitle(id: number, title: string) {
    const res = await fetch(`${BASE_URL}/${id}/title`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: title
        })
    })

    if (!res.ok) throw new Error("Couldn't patch list title");

    return await res.json();

}
