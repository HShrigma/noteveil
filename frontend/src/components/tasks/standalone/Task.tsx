import { useState } from "react";
import ActiveTask from "./ActiveTask";
import InactiveTask from "./InactiveTask";
import { TaskItem } from "../../../utils/tasks/taskTypes";

interface TaskProps {
  task: TaskItem;
  isActive: boolean;
  onRequestActive: (status: boolean) => void;
  onSubmit?: (id: number, label: string) => void;
  onDoneChange?: (id: number, done: boolean) => void;
  onDelete: (id: number) => void;
}

const Task = ({ task, isActive, onSubmit, onDoneChange, onDelete, onRequestActive }: TaskProps) => {

  return isActive ? (
    <ActiveTask
      taskId={task.id}
      initialValue={task.label}
      done={task.done}
          onSubmit={(id, label) => { onSubmit?.(id, label); onRequestActive(false); }}
      onCancel={() => onRequestActive(false)}
    />
  ) : (
    <InactiveTask
      taskId={task.id}
      label={task.label}
      done={task.done}
      onActivate={() => onRequestActive(true)}
      onDoneChange={onDoneChange}
      onDelete={onDelete}
    />
  );
};

export default Task;