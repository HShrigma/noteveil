import { TokenResponse } from "@react-oauth/google";
import { CORE_URL } from "./apiUtils"
const BASE_URL = `${CORE_URL}/users`;

export const authenticateWithGoogle = async (token: TokenResponse) => {
    try {
        const res = await fetch(`${BASE_URL}/auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: token })
        });
        const data = await res.json();

        if (!res.ok) {
            return { error: data.error || "Response not OK" }
        }
        return data;
    }
    catch(error){
        console.error("Error authenticating with Google", error);
        return undefined;
    }

}

// Get email
export const fetchIfEmailExists = async (email: string) => {
    const res = await fetch(`${BASE_URL}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email })
    });
    return res.json();
}

// Get User
export const fetchUser = async (email: string, password: string) => {
    try {
        const res = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            const text = await res.text();
            const data = text ? JSON.parse(text) : null;
            return { error: data?.error || 'Unknown error', status: res.status };
        }

        return await res.json();
    }
    catch (error) {
        console.error(error);
        return { error: 'Network error', status: 0 };
    }
}


// Delete User
export const deleteUser = async (id: number, password: string) => {
    const res = await fetch(`${BASE_URL}/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, password: password })
    });

    if (!res.ok) {
        console.error(res);
        throw new Error("Failed to delete user");
    }
    return await res.json();
}


// Add User
export const addUser = async (email: string, name: string, password: string) => {
    const res = await fetch(`${BASE_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, name: name, password: password })
    })

    if (!res.ok) throw new Error("Failed to add new user");

    return await res.json();
}

// Update User
export const patchUser = async (id: number, key: string, values: string[]) => {
    const res = await fetch(`${BASE_URL}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: id, key: key, values: values
        })
    })

    if (!res.ok) throw new Error("Couldn't patch user");

    return await res.json();
}