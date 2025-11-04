import { useState } from "react";
import Tasks from "./Tasks";
import type { TaskItem } from "./Task";
import TaskAdder from "./TaskAdder";

export const TasksHolder = () => {
    const [uniqueId,setUniqueId] = useState(4);
    const [allTasks, setAllTasks] = useState<TaskItem[]>([
        { id: 1, label: "Buy groceries", done: false },
        { id: 2, label: "Walk the dog", done: true },
        { id: 3, label: "Learn React", done: false }
    ]);
    const updateTasks = (id: number, label: string, completed: boolean) => {
        setAllTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, label, done: completed } : task));
    };
    const addNewTask = (label:string) => {
        const newId = uniqueId;
        setUniqueId(prev => prev + 1);
        setAllTasks(prevTasks => [...prevTasks, { id: newId, label, done: false }]);
    }
    const removeTask = (id: number) => {
        setAllTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };
    return (
        <div>
            <h3>ToDo</h3>
            <Tasks
                inputTasks={allTasks.filter(task => task.done === false)}
                onTaskChanged={updateTasks}
                onDelete={removeTask}
            />
            <TaskAdder onTaskAdded={addNewTask}/>
            <h3>Done</h3>
            <Tasks
                inputTasks={allTasks.filter(task => task.done === true)}
                onTaskChanged={updateTasks}
                onDelete={removeTask}
            />
        </div>
    );
}
export default TasksHolder;