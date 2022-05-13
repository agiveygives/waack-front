import type { Accomplishment } from "../types/accomplishment";
import { writable } from "svelte/store";

export const initialAccomplishmentData: Accomplishment = {
    date: '',
    description: '',
    content: '',
    uploadedFiles: null,
    tags: '',
}

export const accomplishments = writable([])