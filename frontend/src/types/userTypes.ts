export interface UserData{
    id: number;
    email: string; 
    password: string;
}

export type UserType = UserData | null;