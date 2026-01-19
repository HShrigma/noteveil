export interface User {
    id: number;
    email: string;
    name: string;
    password: string;
};

export interface UserReturnObj {
    id: number;
    email: string;
    name: string;
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