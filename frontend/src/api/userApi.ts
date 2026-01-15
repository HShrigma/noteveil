import { CORE_URL } from "./apiUtils"
const BASE_URL = `${CORE_URL}/user`;

// Get User
export const fetchUser = async (email: string, password:string) => {
    const res = await fetch(`${BASE_URL}/`, {
        method:"GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password })
    });
    return res.json();
}

// Delete User
export const deleteUser = async (id: number) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    });

    if (!res.ok) throw new Error("Failed to delete user");
    return await res.json();
}


// Add User
export const addUser = async (name: string) => {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name })
    })

    if (!res.ok) throw new Error("Failed to add new user");

    return await res.json();

}

// Update User
export const patchUser = async (id: number, key: string, value: string) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            [key]: value
        })
    })

    if (!res.ok) throw new Error("Couldn't patch username");

    return await res.json();
}