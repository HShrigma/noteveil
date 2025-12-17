import { useState } from "react";
import ActiveTask from "./ActiveTask";
import InactiveTask from "./InactiveTask";
import { TaskItem } from "../../../utils/tasks/taskTypes";

interface TaskProps {
  task: TaskItem;
  startEditing?: boolean;
  onSubmit?: (id: number, label: string) => void;
  onDoneChange?: (id: number, done: boolean) => void;
  onDelete: (id: number) => void;
}

const Task = ({ task, startEditing = false, onSubmit, onDoneChange, onDelete }: TaskProps) => {
  const [editing, setEditing] = useState(startEditing || task.label === "");

  return editing ? (
    <ActiveTask
      taskId={task.id}
      initialValue={task.label}
      done={task.done}
      onSubmit={(id, label) => { onSubmit?.(id, label); setEditing(false); }}
      onCancel={() => setEditing(false)}
    />
  ) : (
    <InactiveTask
      taskId={task.id}
      label={task.label}
      done={task.done}
      onActivate={() => setEditing(true)}
      onDoneChange={onDoneChange}
      onDelete={onDelete}
    />
  );
};

export default Task;

