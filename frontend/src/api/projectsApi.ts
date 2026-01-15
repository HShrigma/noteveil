import { CORE_URL, USERS_URL } from "./apiUtils"
const BASE_URL = `${CORE_URL}/projects`;
const getUserUrl = (userId: number) => `${USERS_URL}/${userId}/projects`;

// Get Projects
export const fetchProjects = async (userId: number) => {
    const res = await fetch(`${getUserUrl(userId)}`);
    if (!res.ok) throw new Error("Failed to fetch projects");
    return res.json();
}

// Delete Project
export const deleteProject = async (id: number) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    });

    if (!res.ok) throw new Error("Failed to delete project");
    return await res.json();
}


// Add Project
export const addProject = async (userId: number, title: string) => {
    const res = await fetch(getUserUrl(userId), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title })
    })
    console.log(res);
    if (!res.ok) throw new Error("Failed to add new project");

    return await res.json();

}

// Update Project Title
export const patchProjectTitle = async (id: number, title: string) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: title
        })
    })

    if (!res.ok) throw new Error("Couldn't patch project");

    return await res.json();
}