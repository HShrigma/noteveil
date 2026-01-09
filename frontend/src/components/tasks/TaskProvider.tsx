import { ReactNode } from "react";
import { TaskManagerContext } from "../../utils/tasks/taskManagerContext";
import { useTaskManager } from "../../utils/tasks/useTaskManager";

export const TaskProvider = ({ children, activeProjectId }: { children: ReactNode, activeProjectId: number | null }) => {
  const manager = useTaskManager(activeProjectId);
  return (
    <TaskManagerContext.Provider value={manager}>
      {children}
    </TaskManagerContext.Provider>
  );
};
