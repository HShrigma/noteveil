import { CORE_URL } from "./apiUtils"
const BASE_URL = `${CORE_URL}/users`;

// Get email
export const fetchIfEmailExists = async (email: string) => {
    const res = await fetch(`${BASE_URL}/verify`, {
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email})
    });
    return res.json(); 
}

// Get User
export const fetchUser = async (email: string, password:string) => {
    const res = await fetch(`${BASE_URL}/login`, {
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password })
    });
    if (!res.ok) return undefined;
    const text = await res.text();
    if (!text) return undefined;

    return JSON.parse(text);
}

// Delete User
export const deleteUser = async (id: number, password: string) => {
    const res = await fetch(`${BASE_URL}/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, password: password})
    });
    
    if (!res.ok) {
        console.log(res);
        throw new Error("Failed to delete user");
    }
    return await res.json();
}


// Add User
export const addUser = async (email: string, name: string, password: string) => {
    const res = await fetch(`${BASE_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, name: name , password: password})
    })

    if (!res.ok) throw new Error("Failed to add new user");

    return await res.json();
}

// Update User
export const patchUser = async (id: number, key: string, values: string[]) => {
    console.log(id);
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            key: key, values: values
        })
    })

    if (!res.ok) throw new Error("Couldn't patch user");

    return await res.json();
}