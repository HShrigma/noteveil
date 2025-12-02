import { useState } from "react";
import TaskList, { type TaskListData } from "./TaskList";
import type { TaskItem } from "./Task";
import Masonry from "react-masonry-css";

export const TasksHolder = () => {
  const sampleTasks = [
    {id: 0,label:"sample Task", done:false},
    {id: 1,label:"do Thing", done:false},
    {id: 2,label:"complete Thing", done:false},
  ];
  const [allTasks, setAllTasks] = useState<TaskListData[]>([
    { id:0, title: "tasks 1", tasks: sampleTasks }, 
    { id:1, title: "tasks 2", tasks: sampleTasks }
  ]);

  const handleTaskChanged = (id: number, label: string, completed: boolean) => {
  };
  const addNewTask = (id:number, label: string) => {
  };

  const removeTask = (id: number, taskId: number) => {
      const taskList = allTasks[id];
      taskList.tasks.splice(1,taskId);
      setAllTasks((prevTasks) => prevTasks.map( taskData => taskData.id !== id ? taskData : taskList ));
  };

  const editTaskTitle = (id:number, newValue: string) => {};
  const submitTaskTitle = (id:number) => {};
  return (
    <Masonry className="font-mono text-[#c0caf5] flex flex-col gap-8">
        {allTasks.map(task => 
          <section className="bg-[#1f2335] p-5 rounded-md shadow-md shadow-black/30 border border-[#2a2f47]">
            <TaskList
              data={task}
              onTaskChanged={handleTaskChanged}
              onTaskAdded={addNewTask}
              onTaskRemoved={removeTask}
              onTitleEdited={editTaskTitle}
              onTitleSubmitted={submitTaskTitle}
            />
          </section>
      )}
    </Masonry>
  );
};

export default TasksHolder;
