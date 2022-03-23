export interface User {
    username: string;
    displayName: string;
    token: string;
    image?: string;

}


export interface UserFomValues{
    email: string;
    password: string;
    displayName?: string;
    userName?: string;
}