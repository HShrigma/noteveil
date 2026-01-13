export interface UserData{
    id: number;
    userName: string;
    email: string; 
    password: string;
}

export type UserType = UserData | null;