import EditableTitle from "../shared/EditableTitle";
import GoesToButton from "./GoesToButton";
import Task, { type TaskItem } from "./Task";
import TaskBottomBar from "./TaskBottomBar";

export interface TaskListData {
  id: number;
  title: string;
  tasks: TaskItem[];
  nextId?: number;
}

interface TaskListProps {
  allTasks: TaskListData[];
  data: TaskListData;
  onTaskSubmit?: (listId: number, taskId: number, label: string) => void;
  onTaskDoneChanged?: (listId: number, taskId: number, done: boolean) => void;
  onTaskAdded?: (listId: number, label: string) => void;
  onTaskRemoved?: (listId: number, taskId: number) => void;
  onTitleEdited?: (id: number, label: string) => void;
  onTitleSubmitted?: (id: number) => void;
  onDeleted?: (id: number) => void;
  onGoesTo?: (id: number, nextId: number) => void;
}

export const TaskList = ({
  allTasks,
  data,
  onTaskSubmit,
  onTaskDoneChanged,
  onTaskAdded,
  onTaskRemoved,
  onTitleEdited,
  onTitleSubmitted,
  onDeleted,
  onGoesTo,
}: TaskListProps) => {
  const handleSubmit = (taskId: number, label: string) => {
    onTaskSubmit?.(data.id, taskId, label);
  };

  const handleDoneChanged = (taskId: number, done: boolean) => {
    onTaskDoneChanged?.(data.id, taskId, done);
  };

  const handleRemoveTask = (taskId: number) => {
    onTaskRemoved?.(data.id, taskId);
  };

  const handleAdd = (label: string) => {
    onTaskAdded?.(data.id, label);
  };

  return (
    <>
      <EditableTitle
        id={data.id}
        title={data.title}
        onEdit={(index, newValue) => onTitleEdited?.(index, newValue)}
        onSubmit={(index) => onTitleSubmitted?.(index)}
      />
      <GoesToButton ownId={data.id} items={allTasks} onGoesTo={(goesToId) => onGoesTo?.(data.id, goesToId)} />
      <div className="flex flex-col gap-2 mt-2">
        {data.tasks &&
          data.tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              // startEditing when a task has empty label (created blank)
              startEditing={task.label === ""}
              onSubmit={(taskId, label) => handleSubmit(taskId, label)}
              onDoneChange={(taskId, done) => handleDoneChanged(taskId, done)}
              onDelete={(taskId) => handleRemoveTask(taskId)}
            />
          ))}
      </div>
      <TaskBottomBar onAdded={(label) => handleAdd(label)} onDelete={() => onDeleted?.(data.id)} />
    </>
  );
};

export default TaskList;
