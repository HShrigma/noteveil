import NotesHolder from "./notes/standalone/NotesHolder";
import TasksHolder from "./tasks/standalone/TasksHolder";
import { MAIN_STATES, type MainState } from '../utils/registries'
import { TaskProvider } from "./tasks/TaskProvider";
import { NoteProvider } from "./notes/NoteProvider";
import Projects from "./projects/Projects";
import { ProjectData, ProjectElementActivity } from "../utils/projects/projectTypes";

interface MainSreenProps {
    projects: ProjectData[];
    activeProjectElement: ProjectElementActivity;
    state: MainState
    onProjectSelect: (id: number | null) => void;
    onProjectAdded: (value: string) => void;
    onProjectDelete: (id: number) => void;
    onProjectTitleSubmit: (id: number, value: string) => void;
    onProjectActivityElementRequest: (req: ProjectElementActivity) => void;
};

export const MainScreen = ({ projects, activeProjectElement, state, onProjectSelect, onProjectDelete, onProjectTitleSubmit: onTitleSubmit, onProjectActivityElementRequest, onProjectAdded }: MainSreenProps) => {
    const getScreen = () => {
        switch (state) {
            case MAIN_STATES.TASK_DISPLAY:
                return <TaskProvider>
                    <TasksHolder />
                </TaskProvider>
            case MAIN_STATES.NOTES_DISPLAY:
                return <NoteProvider> <NotesHolder /> </NoteProvider>
            case MAIN_STATES.PROJECTS_DISPLAY:
                return(
                 <Projects 
                    projects={projects}
                    onProjectAdded={onProjectAdded}
                    activeProjectElement={activeProjectElement}
                    onProjectChange={onProjectSelect} 
                    onProjectDelete={onProjectDelete} 
                    onActivityRequest={onProjectActivityElementRequest}
                    onTitleSubmit={onTitleSubmit}
                    />);
            default:
                console.error(`Unknown State${state}`);
                return <div>An Error Occurred</div>
        }
    }
    return (
        <div className="p-6 bg-[#16161e] min-h-[calc(100vh-5rem)] overflow-auto">
            {getScreen()}
        </div>);
};
export default MainScreen;