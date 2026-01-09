export interface ProjectData{
    id: number;
    title: string;
    taskListCount: number;
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

    // Async   
    refreshProjects: () => Promise<void>;
    addProject: (title: string) => Promise<void>;
    deleteProject: (id: number) => Promise<void>;
    submitProjectTitle: (id: number, value: string) => Promise<void>;

    // Base
    selectProject: (id: number | null) => void;
    requestProjectElementActivity: (req: ProjectElementActivity) => void;

    // Composite
    isAdderActive: () => boolean;
    isProjectTitleActive: (id: number) => boolean;
    buildAdderActivityRequest: (wantsActive: boolean, value: string) => void;
    buildTitleActivityRequest:(id: number, wantsActive: boolean, value: string) => void;
};