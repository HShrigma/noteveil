import { ReactNode } from "react";
import { useTask } from "../../utils/tasks/useTask";
import { TaskContext } from "../../utils/tasks/taskContext";

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const task = useTask();
  return (
    <TaskContext.Provider value={task}>
      {children}
    </TaskContext.Provider>
  );
};
