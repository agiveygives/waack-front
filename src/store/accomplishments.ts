import type { Accomplishment } from "../types/accomplishment";
import { writable } from "svelte/store";

export const initialAccomplishmentData: Accomplishment = {
    date: '',
    description: '',
    content: '',
    url: '',
}

export const accomplishments = writable([])