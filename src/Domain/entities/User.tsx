import { Rol } from "./Rol";

export interface User {
    idUsers?: string;
    name: string;
    lastname: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
    image?: string;
    session_token?: string;
    roles?: Rol[];
}