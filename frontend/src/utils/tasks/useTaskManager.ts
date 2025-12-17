import { TaskManagerContext } from "./taskManagerContext";
import { UseTaskManagerResult as UseTaskManagerResult, UseTaskResult } from "./taskTypes";
import { useTask } from "./useTask";
import { useTaskActivity } from "./useTaskActivity";

export const useTaskManager = (): UseTaskManagerResult => {
  const task:UseTaskResult = useTask(); 
  const activity = useTaskActivity(task.tasks);

  return {
    // state
    tasks: task.tasks,
    active: activity.activeTask,

    // activity
    activateAdder: () =>
      activity.requestActivity({ type: "adder", value: "" }),

    activateTitle: (listId, value) =>
      activity.requestActivity({ type: "title", listId, value }),

    activateTask: (listId, taskId, value) =>
      activity.requestActivity({ type: "task", listId, taskId, value }),

    activateBottomBar: (listId, value) =>
      activity.requestActivity({ type: "bottomBar", listId, value }),

    activateGoesTo: (listId) =>
      activity.requestActivity({ type: "goesTo", listId }),

    clearActivity: () =>
      activity.requestActivity(null),

    // task ops (passthrough)
    createList: task.createList,
    createTask: task.createTask,
    updateTaskLabel: task.updateTaskLabel,
    updateTaskDone: task.updateTaskDone,
    updateTitle: task.updateTitle,
    removeTask: task.removeTask,
    removeList: task.removeList,
    updateGoesTo: task.updateGoesTo,
    getGoesTo: task.getGoesTo,
  } as UseTaskManagerResult;
};
