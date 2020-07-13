export interface addResponse {
    name: string,
    job: string,
    id: number,
    createdAt: string
}
export interface updateResponse {
    name: string,
    job: string,
    updatedAt: string
}

export interface Pantone {
    id: string;
    name: string;
    year: number;
    color: string;
    pantone_value: string;
}