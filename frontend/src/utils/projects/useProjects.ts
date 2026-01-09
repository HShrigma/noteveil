import { useState } from "react";
import { ProjectActivity, ProjectData, ProjectElementActivity } from "./projectTypes"
import { triggerScreenBob } from "../screenShake";
import { createTempId } from "../mathUtils";
import { tryCancelDiscard } from "../activityHelper";
import { discardMsgProjectAdder, discardMsgProjectTitle } from "../registries";

export function useProjects(onProjectOpened?: (id:number) => void) {
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [activeProject, setActiveProject] = useState<ProjectActivity>({ id: null });
    const [activeProjectElement, setActiveProjectElement] =
        useState<ProjectElementActivity>(null);

    const selectProject = (id: number | null) => {
        if (tryCancelDiscard( activeProjectElement !== null, activeProjectElement?.type === "title" ? discardMsgProjectTitle : discardMsgProjectAdder)) return;
        if (id !== null) {
            onProjectOpened?.(id);
            setActiveProjectElement(null);
        }

        setActiveProject({ id });
        triggerScreenBob(150);
    };

    const addProject = (title: string) => {
        const newProject: ProjectData = {
            id: createTempId(),
            title,
            taskCount: 0,
            noteCount: 0,
        };

        setProjects(prev => [...prev, newProject]);
    };

    const deleteProject = (id: number) => {
        setProjects(prev => prev.filter(project => project.id !== id));
    };

    const submitProjectTitle = (id: number, value: string) => {
        setProjects(prev => prev.map(project => project.id === id ? { ...project, title: value } : project));
        setActiveProjectElement(null);
    };

    const didUserDiscardTitle = (req: ProjectElementActivity) => {
        if(activeProject === null || activeProjectElement?.type !== "title") return false;
        const proj = projects.find(p => p.id === activeProjectElement.id);
        if(!proj) return false;
        return proj && tryCancelDiscard(activeProjectElement.value !== proj.title, discardMsgProjectTitle);
    }
    const requestProjectElementActivity = (req: ProjectElementActivity) => {
        if (req === null) {
            setActiveProjectElement(null);
            return;
        }

        if (activeProjectElement === null) {
            setActiveProjectElement(req);
            return;
        }

        if (req.type !== activeProjectElement.type) {
            if (activeProjectElement.type === "adder"
                && tryCancelDiscard(activeProjectElement.value !== "", discardMsgProjectAdder)) return;
            if (didUserDiscardTitle(req)) return;
        }
        if(req.type === "title" 
            && activeProjectElement.type === "title" 
            && req.id !== activeProjectElement.id
            && didUserDiscardTitle(req)) return;

        setActiveProjectElement(req);
    };

    const buildTitleActivityRequest = (id: number, wantsActive: boolean, value: string) => requestProjectElementActivity(wantsActive ? { id: id, type: "title", value: value } : null);
    const buildAdderActivityRequest = (wantsActive: boolean, value: string) => requestProjectElementActivity(wantsActive ? {type:"adder", value:value} : null);
    const isProjectTitleActive = (id: number) => activeProjectElement !== null && activeProjectElement.type === "title" && activeProjectElement.id === id;
    const isAdderActive = () => {return activeProjectElement !== null && activeProjectElement.type === "adder"};
    return {
        projects,
        activeProject,
        activeProjectElement,
        selectProject,
        addProject,
        deleteProject,
        submitProjectTitle,
        requestProjectElementActivity,
        buildAdderActivityRequest,
        buildTitleActivityRequest,
        isAdderActive,
        isProjectTitleActive,
    };
}
