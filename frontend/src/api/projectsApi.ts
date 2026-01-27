import { CORE_URL, USERS_URL } from "./apiUtils"
const BASE_URL = `${CORE_URL}/projects`;
const getUserUrl = () => `${USERS_URL}/projects`;

// Get Projects
export const fetchProjects = async () => {
    const res = await fetch(`${getUserUrl()}/get`,{
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) return {error:res.status};
    return res.json();
}

// Delete Project
export const deleteProject = async (id: number) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) return { error: res.status };
    return await res.json();
}


// Add Project
export const addProject = async (userId: number, title: string) => {
    const res = await fetch(`${getUserUrl()}/add`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title })
    })

    if (!res.ok) return { error: res.status };
    return await res.json();
}

// Update Project Title
export const patchProjectTitle = async (id: number, title: string) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: title
        })
    })

    if (!res.ok) return { error: res.status };
    return await res.json();
}