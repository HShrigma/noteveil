import { useState } from "react";
import { ProjectActivity, ProjectData, ProjectElementActivity } from "./projectTypes"
import { triggerScreenBob } from "../screenShake";
import { createTempId } from "../mathUtils";
import { tryCancelDiscard } from "../activityHelper";
import { discardMsgProjectAdder, discardMsgProjectTitle } from "../registries";

const sampleProjects: ProjectData[] = [
    { id: 1, title: "Sample", taskCount: 20, noteCount: 10 },
    { id: 2, title: "Sample 2", taskCount: 20, noteCount: 10 },
];

export function useProjects(onProjectOpened?: () => void) {
    const [projects, setProjects] = useState<ProjectData[]>(sampleProjects);
    const [activeProject, setActiveProject] = useState<ProjectActivity>({ id: null });
    const [activeProjectElement, setActiveProjectElement] =
        useState<ProjectElementActivity>(null);

    const selectProject = (id: number | null) => {
        if (tryCancelDiscard( activeProjectElement !== null, activeProjectElement?.type === "title" ? discardMsgProjectTitle : discardMsgProjectAdder)) return;
        if (id !== null) {
            onProjectOpened?.();
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
            if (activeProjectElement.type === "adder") {
                if (tryCancelDiscard(activeProjectElement.value !== "", discardMsgProjectAdder))return;
            }

            if (activeProjectElement.type === "title") {
                const proj = projects.find(p => p.id === activeProjectElement.id);
                if (proj && tryCancelDiscard(activeProjectElement.value !== proj.title, discardMsgProjectTitle)) return;
            }
        }

        setActiveProjectElement(req);
    };

    return {
        projects,
        activeProject,
        activeProjectElement,
        selectProject,
        addProject,
        deleteProject,
        submitProjectTitle,
        requestProjectElementActivity,
    };
}
