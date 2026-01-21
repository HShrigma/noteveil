import { TokenResponse } from "@react-oauth/google";
import { CORE_URL } from "./apiUtils"
const BASE_URL = `${CORE_URL}/users`;

export const refreshUser = async () => {
    try {
        const res = await fetch(`${BASE_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) return null; 

        return data;
    } catch (err) {
        console.error("Failed to initialize user", err);
        return null;
    }
}

export const logoutAndClearToken = async () => {
    try {
        const res = await fetch(`${BASE_URL}/logout`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();

        if (!res.ok) {
            return { error: data.error || "Response not OK" }
        }
        return data;
    }
    catch (error) {
        console.error("Error logging out", error);
        return undefined;
    }
}
export const authenticateWithGoogle = async (token: TokenResponse) => {
    try {
        const res = await fetch(`${BASE_URL}/auth/google`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: token })
        });
        const data = await res.json();

        if (!res.ok) {
            return { error: data.error || "Response not OK" }
        }
        return data;
    }
    catch (error) {
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
            credentials: "include",
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
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, password: password })
    });

    const data = await res.json();
    if (!res.ok) {
        console.error(res);
    }
    return data;
}


export const deleteUserById = async (id: number) => {
    const res = await fetch(`${BASE_URL}/delete`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id })
    });

    if (!res.ok) {
        console.error(res);
        throw new Error("Failed to delete user by id");
    }
    return await res.json();
}

// Add User
export const registerUser = async (email: string, name: string, password: string) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password })
    })

    if (!res.ok) {
        console.error("Failed to register user");
        return null;
    }

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