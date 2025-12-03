import { useState } from "react";
import TaskList, { type TaskListData } from "./TaskList";
import Masonry from "react-masonry-css";
import { triggerScreenBob, triggerScreenShake } from "../utils/screenShake";
import TaskListAdder from "./TaskListAdder";

export const TasksHolder = () => {
  const breakpointColumnsObj = {
    default: 4,
    1024: 3,
    768: 2,
    500: 1,
  };
  const sampleTasks = [
    { id: 0, label: "sample Task", done: false },
    { id: 1, label: "do Thing", done: false },
    { id: 2, label: "complete Thing", done: false },
  ];
  const [allTasks, setAllTasks] = useState<TaskListData[]>([
    { id: 1, title: "tasks 1", tasks: [...sampleTasks] },
    { id: 2, title: "tasks 2", tasks: [...sampleTasks] }
  ]);
  const [maxId,setMaxId] = useState(3);

  const getTaskListIndexById = (id: number) => {
    return allTasks.findIndex(t => t.id === id);
  }
  const handleTaskChanged = (id: number, taskId: number, label: string, completed: boolean) => {
    const listIndex = getTaskListIndexById(id);
    const newTaskList = { ...allTasks[listIndex] };
    newTaskList.tasks[newTaskList.tasks.findIndex(t => t.id === taskId)] = { id: taskId, label, done: completed };

    setAllTasks(prev => prev.map(t => (t.id === id ? newTaskList : t)));
  };

  const addNewTask = (id: number, newTaskId: number, label: string) => {
    const listIndex = getTaskListIndexById(id);
    const newTaskList = { ...allTasks[listIndex] };

    newTaskList.tasks.push({ id: newTaskId, label, done: false });
    setAllTasks(prev => prev.map(t => (t.id === id ? newTaskList : t)));
    triggerScreenBob(150);
  };

  const removeTask = (id: number, taskId: number) => {
    const listIndex = getTaskListIndexById(id);
    const newTaskList = { ...allTasks[listIndex] };

    newTaskList.tasks = newTaskList.tasks.filter(t => t.id !== taskId);
    setAllTasks(prev =>
      prev.map(t => (t.id === id ? newTaskList : t))
    );
  };

  const editTaskTitle = (id: number, newValue: string) => {
    const newTasks = [...allTasks];
    newTasks[getTaskListIndexById(id)].title = newValue;
    setAllTasks(newTasks);
  };

  const removeList = (id: number) => {
    const newTasks = [...allTasks];
    setAllTasks(newTasks.filter(task => task.id != id));
    triggerScreenShake();
  }

  const submitTaskTitle = () => {
    triggerScreenBob(200);
  };

  const addTaskList = (title:string) =>{
    const newTasks = [...allTasks];
    newTasks.push({ id: maxId, title, tasks:[]}); 
    setMaxId(n => n + 1);
    setAllTasks(newTasks);
    triggerScreenBob();
  }
  return (
    <div>
      <TaskListAdder onTaskListAdded={addTaskList}/>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-4"
        columnClassName="flex flex-col gap-4"
      >
        {allTasks.map(task =>
          <section
            className="bg-[#1f2335] p-5 rounded-md shadow-md shadow-black/30 border border-[#2a2f47]"
            key={task.id}
          >
            <TaskList
              data={task}
              onTaskChanged={handleTaskChanged}
              onTaskAdded={addNewTask}
              onTaskRemoved={removeTask}
              onTitleEdited={editTaskTitle}
              onTitleSubmitted={submitTaskTitle}
              onDeleted={removeList}
            />
          </section>
        )}
      </Masonry>

    </div>
  );
};

export default TasksHolder;
