export interface Accomplishment {
    created: string;
    description: string;
    name: string;
    uploadedFiles?: FileList | null;
    tags?: string;
}