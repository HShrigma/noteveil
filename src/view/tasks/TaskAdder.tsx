import { useState } from "react";

interface TaskAdderProps {
    onTaskAdded: (label: string) => void;
};

export const TaskAdder = ({ onTaskAdded }: TaskAdderProps) => {
    const [txt, setTxt] = useState("");
    const [active, setActive] = useState(false);

    const discardInput = () =>{
        setActive(false);
        setTxt("");
    }
    const submitNewTask = () => {
        if (txt.trim()) {
            onTaskAdded?.(txt);
            setTxt("");
            setActive(false);
        }
    }
    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') submitNewTask();
        if (e.key === 'Escape') discardInput();
    }
    return (
        active ?
        <>
        <button onClick={discardInput}>Discard</button>
            <input
                placeholder="Add Task..."
                onKeyDown={handleKey}
                onChange={(e) =>  setTxt(e.target.value) }
                autoFocus /> <button onClick={submitNewTask}>Submit</button>
        </>
        :
            <button onClick={() => setActive(true)}> Add Task </button>

    );
};

export default TaskAdder;