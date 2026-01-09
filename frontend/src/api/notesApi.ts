import { CORE_URL, PROJECTS_URL } from "./apiUtils";
const BASE_URL = `${CORE_URL}/notes`;
const getProjectUrl = (projectId: number) => `${PROJECTS_URL}/${projectId}/notes`;

// Get notes
export const fetchNotes = async (activeProjectId: number) => {
    const res = await fetch(`${getProjectUrl(activeProjectId)}`);
    return res.json();
};

// Delete Note
export async function deleteNote(id: number) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    });

    if (!res.ok) throw new Error("Failed to delete note");
    return await res.json();
}

// Add Note
export async function addNote(activeProjectId: number) {
    const res = await fetch(`${getProjectUrl(activeProjectId)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    });

    if (!res.ok) throw new Error("Failed to add note");
    return await res.json();
}

// Update Note Title
export async function patchNoteTitle(id: number, title: string) {
    const res = await fetch(`${BASE_URL}/${id}/title`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: title
        })
    });

    if (!res.ok) throw new Error("Failed to update title");
    return await res.json();
}

// Update Note Content
export async function patchNoteContent(id: number, content: string) {
    const res = await fetch(`${BASE_URL}/${id}/content`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            content: content
        })
    });

    if (!res.ok) throw new Error("Failed to update content");
    return await res.json();
}