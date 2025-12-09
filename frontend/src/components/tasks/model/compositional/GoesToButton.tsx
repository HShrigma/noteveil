import { useState } from "react";
import type { TaskListData } from "../TaskList";

interface GoesToButtonProps {
    ownId: number;
    items: TaskListData[];
    onGoesTo?: (id: number) => void;
};

export const GoesToButton = ({ ownId, items, onGoesTo }: GoesToButtonProps) => {
    const [active, setActive] = useState(false);
    const [label, setLabel] = useState("None");
    const [shaking, setShaking] = useState(false);

    const triggerShake = () => {
        setShaking(true);
        setTimeout(() => setShaking(false), 150); // same timing as your subtle shake
    };

    const selectNext = (id: number) => {
        onGoesTo?.(id);
        setActive(false);

        const item = items.find(i => i.id === id);
        setLabel(item ? item.title : "None");

        triggerShake();
    };

    return (
        <div className="relative inline-block my-2">
            <button
                className={`
                    flex items-center gap-2 px-3 py-1 rounded-2xl border-2 
                    border-purple-500 ${label === "None" ? "bg-purple-800" : "bg-purple-500"}
                    text-[#f6faff] transition-all duration-150
                    hover:bg-[#bb9af7] hover:shadow-[0_0_10px_#bb9af7]
                    ${shaking ? "shake-subtle" : ""}
                `}
                onClick={() => setActive(n => !n)}
            >
                Goes To: {label}
            </button>

            {active && (
                <div
                    className="absolute mt-2 left-0 w-40 bg-[#1f2335] border border-[#2a2f47] 
                               rounded-md shadow-lg z-50 fade-in"
                >
                    {items.filter(n => n.id !== ownId).map(item => (
                        <div
                            key={item.id}
                            className="px-3 py-2 hover:bg-purple-600 hover:text-white cursor-pointer transition-colors"
                            onClick={() => selectNext(item.id)}
                        >
                            {item.title}
                        </div>
                    ))}
                    <div
                        className="px-3 py-2 hover:bg-purple-600 hover:text-white cursor-pointer transition-colors"
                        onClick={() => selectNext(-1)}
                    >
                        None
                    </div>
                </div>
            )}
        </div>
    );
};

export default GoesToButton;

