import { Roles } from './roles';

export interface UserInterface{
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    photoUrl?: string;
    roles: Roles;
}