import { createContext, ReactNode, useContext } from "react";
import { UseTaskManagerResult as UseTaskManagerResult } from "./taskTypes";

export const TaskManagerContext = createContext<UseTaskManagerResult | null>(null);

export const useTaskManagerContext = () => {
  const ctx = useContext(TaskManagerContext);
  if (!ctx) throw new Error("Must be used inside TaskManagerProvider");
  return ctx;
};

