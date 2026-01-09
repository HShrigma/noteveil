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

export type ProjectsContextResult = {
    projects: ProjectData[];
    activeProject: ProjectActivity;
    activeProjectElement: ProjectElementActivity;

    isAdderActive: () => boolean;
    isProjectTitleActive: (id: number) => boolean;
    selectProject: (id: number | null) => void;
    addProject: (title: string) => void;
    deleteProject: (id: number) => void;
    submitProjectTitle: (id: number, value: string) => void;
    requestProjectElementActivity: (req: ProjectElementActivity) => void;

    buildAdderActivityRequest: (wantsActive: boolean, value: string) => void;
    buildTitleActivityRequest:(id: number, wantsActive: boolean, value: string) => void;
};