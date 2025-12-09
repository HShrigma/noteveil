const BASE_URL = "http://localhost:4000/api/tasks";

export const fetchTasks = async () => {
    const res = await fetch(BASE_URL);
    return res.json();
};

export async function deleteTaskList(id: number) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    });

    if (!res.ok) throw new Error("Failed to delete taskList");

    return await res.json();
}

export async function deleteTask(id: number, taskId: number) {
    const res = await fetch(`${BASE_URL}/${id}/${taskId}`, {
        method: "DELETE"
    });

    if (!res.ok) throw new Error("Failed to delete task");

    return await res.json();
}


export async function addList(id: number, title: string) {
    const res = await fetch(`${BASE_URL}/list/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title })
    })

    if (!res.ok) throw new Error("Failed to add new taskList");

    return await res.json();
}

export async function addTask(id: number, taskId: number, label: string) {
    const res = await fetch(`${BASE_URL}/list/${id}/task/${taskId}`, {
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
    const res = await fetch(`${BASE_URL}/list/${id}/next`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nextId: nextId
        })
    })

    if (!res.ok) throw new Error("Couldn't patch next Id");

    return await res.json();

}

export async function patchTaskDone(id: number, taskId: number, done: boolean) {
    const res = await fetch(`${BASE_URL}/list/${id}/task/${taskId}/done`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            done: done
        })
    })

    if (!res.ok) throw new Error("Couldn't patch task done");

    return await res.json();

}

export async function patchTaskLabel(id: number, taskId: number, label: string) {
    const res = await fetch(`${BASE_URL}/list/${id}/task/${taskId}/label`, {
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
    const res = await fetch(`${BASE_URL}/list/${id}/title`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: title
        })
    })

    if (!res.ok) throw new Error("Couldn't patch list title");

    return await res.json();

}
