// This is an individual task 

export interface TaskItem{
    id: number;
    label: string;
    done: boolean;
};

interface TaskProps {
    task: TaskItem;
    onStatusChange?: (id: number, label: string, done: boolean) => void;
    onDelete: (id: number) => void;
}

// Component
export const Task = ({ task, onStatusChange, onDelete }: TaskProps) => {

    // Methods
    const handleDoneClick = () => {
        onStatusChange?.(task.id, task.label, !task.done);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onStatusChange?.(task.id, event.target.value, task.done);
    }

    const handleDeleteClick = () => {
        onDelete?.(task.id);
    }
    // Final Component
    return (
        <div>
            <button onClick={handleDeleteClick}>Delete</button>
            <input 
            placeholder="Add Task..." 
            onChange={handleInputChange}
            value={task.label} 
            />
            <button onClick={handleDoneClick}> {task.done ? "Done" : "ToDo"}</button>
        </div>
    );
};

export default Task;