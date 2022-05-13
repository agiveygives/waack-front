export interface Accomplishment {
    date: string;
    description: string;
    content: string;
    uploadedFiles?: FileList | null;
    tags?: string;
}