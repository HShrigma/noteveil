export interface User {
    id: number;
    email: string;
    name: string;
    password: string;
    from_auth: boolean;
};

export interface UserReturnObj {
    id: number;
    email: string;
    name: string;
    from_auth: boolean;
}

export interface GoogleUserInfo {
    sub: string;
    name: string;
    given_name?: string;
    family_name?: string;
    picture?: string;
    email: string;
    email_verified: boolean;
    locale?: string;
}

export interface UserJWTPayload {
    id: number;
};

export interface UserRefreshResult {
    token: string;
    user: UserReturnObj;
}