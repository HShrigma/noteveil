import { useState } from "react";
import Tasks from "./Tasks";
import type { TaskItem } from "./Task";
import TaskAdder from "./TaskAdder";

export const TasksHolder = () => {
  const [uniqueId, setUniqueId] = useState(4);
  const [allTasks, setAllTasks] = useState<TaskItem[]>([
    { id: 1, label: "Buy groceries", done: false },
    { id: 2, label: "Walk the dog", done: true },
    { id: 3, label: "Learn React", done: false },
  ]);

  const updateTasks = (id: number, label: string, completed: boolean) => {
    setAllTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, label, done: completed } : task
      )
    );
  };

  const addNewTask = (label: string) => {
    const newId = uniqueId;
    setUniqueId((prev) => prev + 1);
    setAllTasks((prevTasks) => [...prevTasks, { id: newId, label, done: false }]);
  };

  const removeTask = (id: number) => {
    setAllTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="font-mono text-[#c0caf5] flex flex-col gap-8">
      {/* Active Tasks */}
      <section className="bg-[#1f2335] p-5 rounded-md shadow-md shadow-black/30 border border-[#2a2f47]">
        <h3 className="text-xl font-semibold text-[#9d7cd8] mb-3 tracking-wide">
          ToDo
        </h3>
        <Tasks
          inputTasks={allTasks.filter((task) => !task.done)}
          onTaskChanged={updateTasks}
          onDelete={removeTask}
        />
        <div className="mt-4">
          <TaskAdder onTaskAdded={addNewTask} />
        </div>
      </section>

      {/* Completed Tasks */}
      <section className="bg-[#1f2335] p-5 rounded-md shadow-md shadow-black/30 border border-[#2a2f47]">
        <h3 className="text-xl font-semibold text-[#9d7cd8] mb-3 tracking-wide">
          Done
        </h3>
        <Tasks
          inputTasks={allTasks.filter((task) => task.done)}
          onTaskChanged={updateTasks}
          onDelete={removeTask}
        />
      </section>
    </div>
  );
};

export default TasksHolder;
