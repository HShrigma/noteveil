import { CORE_URL } from "./apiUtils"
const BASE_URL = `${CORE_URL}/projects`;

// Get Projects
export const fetchProjects = async () => {
    const res = await fetch(BASE_URL);
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
export const createProject = async (title: string) => {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title })
    })

    if (!res.ok) throw new Error("Failed to add new project");

    return await res.json();

}

// Update Project Title
export const updateProject = async (id: number, title: string) => {
    const res = await fetch(`${BASE_URL}/${id}/title`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: title
        })
    })

    if (!res.ok) throw new Error("Couldn't patch project");

    return await res.json();
}