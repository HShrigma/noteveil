import { useState } from "react";
import type { TaskListData } from "./TaskList";

interface GoesToButtonProps {
    ownId: number;
    items: TaskListData[];
    onGoesTo?: (id: number) => void;
};

export const GoesToButton = ({ ownId, items, onGoesTo }: GoesToButtonProps) => {
    const [active, setActive] = useState(false);

    const selectNext = (id: number) => {
        onGoesTo?.(id);
        setActive(false);
    }
    return (
        <>
            <button
                className="flex items-center gap-2 px-2 rounded-2xl border-2 border-purple-500 bg-purple-500  text-[#f6faff] hover:bg-[#bb9af7] hover:shadow-[0_0_10px_#bb9af7] transition-all duration-150"
                onClick={() => { setActive(true) }}>
                Goes To
            </button>
            {active && (
                <div>
                    {items.filter(n => n.id !== ownId).map((item) =>
                        <div
                            key={item.id}
                            onClick={() => selectNext(item.id)}>
                            {item.title}
                        </div>)} 
                    <div
                        onClick={() => selectNext(-1)}>
                        None
                    </div>
                </div>)
            }
        </>);
};
export default GoesToButton;