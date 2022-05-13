import type { User } from "../types/user";
import { writable } from "svelte/store";

export const initialUserInfo: User = {
    name: '',
    email: '',
    title: '',
    manager: '',
}

export const userInfo = writable(initialUserInfo);