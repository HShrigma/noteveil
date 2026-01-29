import type { UseTaskManagerResult, UseTaskResult } from "../../types/taskTypes";
import { useTask } from "./useTask";
import { useTaskActivity } from "./useTaskActivity";

export const useTaskManager = (activeProjectId: number | null): UseTaskManagerResult => {
  const task:UseTaskResult = useTask(activeProjectId); 
  const activity = useTaskActivity(task.tasks);
  const updateTitle = async (id: number, value: string) => {
    activity.clearActivity();
    await task.updateTitle(id, value);
  }
  return {
    // state
    tasks: task.tasks,
    activeProjectId: task.activeProjectId,
    active: activity.activeTask,

    // activity
    activateAdder: (value: "") =>
      activity.requestActivity({ type: "adder", value:value }),

    activateTitle: (listId, value) =>
      activity.requestActivity({ type: "title", listId, value }),

    activateTask: (listId, taskId, value) =>
      activity.requestActivity({ type: "task", listId, taskId, value }),

    activateBottomBar: (listId, value: "") =>
      activity.requestActivity({ type: "bottomBar", listId, value }),

      isActive: (type: string) => activity.isActive(type),
    activateGoesTo: (listId) =>
      activity.requestActivity({ type: "goesTo", listId }),
    clearActivity: () =>
      activity.requestActivity(null),

    // task ops (passthrough)
    createList: task.createList,
    createTask: task.createTask,
    updateTaskLabel: task.updateTaskLabel,
    updateTaskDone: task.updateTaskDone,
    updateTitle,
    removeTask: task.removeTask,
    removeList: task.removeList,
    updateGoesTo: task.updateGoesTo,
    getGoesTo: task.getGoesTo,
  } as UseTaskManagerResult;
};
