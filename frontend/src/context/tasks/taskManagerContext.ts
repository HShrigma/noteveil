import { createContext, useContext } from "react";
import type { UseTaskManagerResult } from "../../types/taskTypes";

export const TaskManagerContext = createContext<UseTaskManagerResult | null>(null);

export const useTaskManagerContext = () => {
  const ctx = useContext(TaskManagerContext);
  if (!ctx) throw new Error("Must be used inside TaskManagerProvider");
  return ctx;
};

