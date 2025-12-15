import { createContext, useContext } from "react";
import { UseTaskResult } from "../types";

export const TaskContext = createContext<UseTaskResult | null>(null);

export const useTasksContext = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasksContext must be used inside TaskProvider");
  return ctx;
};
