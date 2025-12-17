import { ReactNode } from "react";
import { TaskManagerContext } from "../../utils/tasks/taskManagerContext";
import { useTaskManager } from "../../utils/tasks/useTaskManager";

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const manager = useTaskManager();
  return (
    <TaskManagerContext.Provider value={manager}>
      {children}
    </TaskManagerContext.Provider>
  );
};
