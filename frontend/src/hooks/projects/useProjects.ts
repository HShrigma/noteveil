import { useEffect, useState } from "react";
import { ProjectActivity, ProjectData, ProjectElementActivity, ProjectsContextResult } from "../../types/projectTypes"
import { triggerScreenBob } from "../../utils/screenShake";
import { createTempId } from "../../utils/mathUtils";
import { tryCancelDiscard } from "../../utils/activityHelper";
import { discardMsgProjectAdder, discardMsgProjectTitle } from "../../utils/registries";
import { addProject, deleteProject, fetchProjects, patchProjectTitle } from "../../api/projectsApi";
import { useUserContext } from "../../context/users/userContext";

export function useProjects(onProjectOpened?: (id: number) => void) {
    const userCtx = useUserContext();

    const refreshProjects = async () => {
        if (userCtx.user === null) return; 
        const data = await fetchProjects();
        if(data.error) {
            await userCtx.authLogout();
            return;
        }
        setProjects(data);
    };

    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [activeProject, setActiveProject] = useState<ProjectActivity>({ id: null });
    const [activeProjectElement, setActiveProjectElement] =
        useState<ProjectElementActivity>(null);

    const fetch = () => {
        if (userCtx.user === null) return; 

        fetchProjects().then((fetched) => { 
            if(fetched.error){
                setProjects([]);
                userCtx.authLogout();
                return;
            }
            setProjects(fetched)
        });
    }
    useEffect(() => fetch(), [userCtx.user]);
    useEffect(() => fetch(), []);

    const selectProject = (id: number | null) => {
        if (tryCancelDiscard(activeProjectElement !== null, activeProjectElement?.type === "title" ? discardMsgProjectTitle : discardMsgProjectAdder)) return;
        if (id !== null) {
            onProjectOpened?.(id);
            setActiveProjectElement(null);
        }

        setActiveProject({ id });
        triggerScreenBob(150);
    };

    const createProject = async (title: string) => {
        if(userCtx.user === null) return;
        const tempId = createTempId();
        const newProject: ProjectData = {
            id: tempId,
            title,
            taskListCount: 0,
            noteCount: 0,
        };

        setProjects(prev => [...prev, newProject]);

        const res = await addProject(userCtx.user.id, title);
        if (res.error) {
            setProjects(prev => prev.filter(n => n.id !== tempId))
            await userCtx.authLogout();
            return;
        }

        const realId = Number(res.body.id);
        setProjects(prev => prev.map(n => n.id === tempId ? { ...n, id: realId } : n))
        return realId;
    };

    const removeProject = async (id: number) => {
        const res = await deleteProject(id);
        if(res.error){
            await userCtx.authLogout();
            return;
        }
        setProjects(prev => prev.filter(project => project.id !== id));
    };

    const submitProjectTitle = async (id: number, value: string) => {
        const temp = projects.find(p => p.id === id);
        if(!temp) return;

        setProjects(prev => prev.map(project => project.id === id ? { ...project, title: value } : project));
        setActiveProjectElement(null);

        const res = await patchProjectTitle(id, value);
        if(res.error){
            setProjects(prev => prev.map(project => project.id === id ? { ...project, title: temp?.title } : project));
            await userCtx.authLogout();
        }
    };

    const didUserDiscardTitle = (req: ProjectElementActivity) => {
        if (activeProject === null || activeProjectElement?.type !== "title") return false;
        const proj = projects.find(p => p.id === activeProjectElement.id);
        if (!proj) return false;
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
        if (req.type === "title"
            && activeProjectElement.type === "title"
            && req.id !== activeProjectElement.id
            && didUserDiscardTitle(req)) return;

        setActiveProjectElement(req);
    };

    const buildTitleActivityRequest = (id: number, wantsActive: boolean, value: string) => requestProjectElementActivity(wantsActive ? { id: id, type: "title", value: value } : null);
    const buildAdderActivityRequest = (wantsActive: boolean, value: string) => requestProjectElementActivity(wantsActive ? { type: "adder", value: value } : null);
    const isProjectTitleActive = (id: number) => activeProjectElement !== null && activeProjectElement.type === "title" && activeProjectElement.id === id;
    const isAdderActive = () => { return activeProjectElement !== null && activeProjectElement.type === "adder" };
    return {
        projects,
        activeProject,
        activeProjectElement,
        refreshProjects,
        selectProject,
        addProject: createProject,
        deleteProject: removeProject,
        submitProjectTitle,
        requestProjectElementActivity,
        buildAdderActivityRequest,
        buildTitleActivityRequest,
        isAdderActive,
        isProjectTitleActive,
    } as ProjectsContextResult;
}
