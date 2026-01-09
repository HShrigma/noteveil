export interface ProjectData{
    id: number;
    title: string;
    taskCount: number;
    noteCount: number;
};
export type ProjectActivity = { id: number | null };

export type ProjectElementActivity = {
    type: "title" ,
    id: number ,
    value: string 
} | {
    type: "adder" ,
    value: string 
} |null;