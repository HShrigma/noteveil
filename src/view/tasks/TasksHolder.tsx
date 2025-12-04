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
  const sampleTasksAlt = [
    { id: 3, label: "sample Task", done: false },
    { id: 4, label: "do Thing", done: false },
    { id: 5, label: "complete Thing", done: false },
  ];
  const [allTasks, setAllTasks] = useState<TaskListData[]>([
    { id: 1, title: "tasks 1", tasks: [...sampleTasks] },
    { id: 2, title: "tasks 2", tasks: [...sampleTasksAlt] }
  ]);
  const [maxId, setMaxId] = useState(3);

  const [maxTaskId, setMaxTaskId] = useState(1000);

  const setNewList = (newTaskList: TaskListData) => setAllTasks(prev => prev.map(t => (t.id === newTaskList.id ? newTaskList : t)));
  const getTaskListIndexById = (id: number) => { return allTasks.findIndex(t => t.id === id); }
  const getTaskListById = (id: number) => { return { ...allTasks[getTaskListIndexById(id)] }; }

  const handleTaskDoneChanged = (id: number, taskId: number, done: boolean) => {
    const newTaskList = getTaskListById(id);
    const taskIndex = newTaskList.tasks.findIndex(t => t.id === taskId);
    const newTask = newTaskList.tasks[taskIndex];

    if (newTaskList.nextId && done) {
      addNewTask(newTaskList.nextId, newTask.label);
      removeTask(newTaskList.id, taskId);
      return;
    }

    newTask.done = done;
    newTaskList.tasks[taskIndex] = newTask;
    setNewList(newTaskList);

  };
  const handleTaskLabelChanged = (id: number, taskId: number, label: string) => {
    const newTaskList = getTaskListById(id);
    const taskIndex = newTaskList.tasks.findIndex(t => t.id === taskId);
    const newTask = newTaskList.tasks[taskIndex];

    if (newTask.label === label) return;

    newTask.label = label;
    newTaskList.tasks[taskIndex] = newTask;
    setNewList(newTaskList);
  };

  const addNewTask = (id: number, label: string) => {
    const newTaskList = getTaskListById(id);
    newTaskList.tasks.push({ id: maxTaskId, label, done: false });
    setNewList(newTaskList);
    setMaxTaskId(n => n + 1);
    triggerScreenBob(150);
  };

  const removeTask = (id: number, taskId: number) => {
    const newTaskList = getTaskListById(id);
    newTaskList.tasks = newTaskList.tasks.filter(t => t.id !== taskId);
    setNewList(newTaskList);
  };

  const editTaskTitle = (id: number, newValue: string) => {
    const newTasks = [...allTasks];
    newTasks[getTaskListIndexById(id)].title = newValue;
    
    const connected = newTasks.map( list => {
      if(list.nextId === id){
        return {
          ...list,
          goToLabel:newValue
        }
      }
      return list;
    });

    setAllTasks(connected);
  };

  const removeList = (id: number) => {
    const remaining = allTasks.filter(task => task.id !== id);

    const cleaned = remaining.map(list => {
      if (list.nextId === id) {
        return {
          ...list,
          nextId: undefined,
          goToLabel: undefined
        };
      }
      return list;
    });

    setAllTasks(cleaned);
    triggerScreenShake();
  };


  const submitTaskTitle = () => {
    triggerScreenBob(200);
  };

  const addTaskList = (title: string) => {
    const newTasks = [...allTasks];
    newTasks.push({ id: maxId, title, tasks: [] });
    setMaxId(n => n + 1);
    setAllTasks(newTasks);
    triggerScreenBob();
  };

  const editGoesTo = (id: number, nextId: number) => {
    const newTaskList = getTaskListById(id);
    newTaskList.nextId = nextId === -1 ? undefined : nextId;
    newTaskList.goToLabel = nextId === -1 ? undefined : getTaskListById(nextId).title;
    setNewList(newTaskList);
  };
  return (
    <div>
      <TaskListAdder onTaskListAdded={addTaskList} />
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-4"
        columnClassName="flex flex-col gap-4"
      >
        {allTasks.map(task =>
          <section
            className="bg-[#1f2335] p-5 rounded-md shadow-md shadow-black/30 border border-[#2a2f47] fade-in"
            key={task.id}
          >
            <TaskList
              allTasks={allTasks}
              data={task}
              onTaskLabelChanged={handleTaskLabelChanged}
              onTaskDoneChanged={handleTaskDoneChanged}
              onTaskAdded={addNewTask}
              onTaskRemoved={removeTask}
              onTitleEdited={editTaskTitle}
              onTitleSubmitted={submitTaskTitle}
              onDeleted={removeList}
              onGoesTo={editGoesTo}
            />
          </section>
        )}
      </Masonry>

    </div>
  );
};

export default TasksHolder;
