import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

interface ConfirmDeleteButtonProps {
    onConfirm: () => void;
    className?: string;
    confirmClassName?: string;
    label?: string;
    confirmLabel?: string;
    color?: "red" | "yellow" | "blue" | "green" | "purple";
    confirmColor?: "red" | "yellow" | "blue" | "green" | "purple";
}

export const ConfirmDeleteButton = ({ 
    onConfirm, 
    className = "", 
    confirmClassName = "", 
    label = "", 
    confirmLabel = "Are you Sure?",
    color = "red",
    confirmColor = "yellow"
}: ConfirmDeleteButtonProps) => {
    const [confirming, setConfirming] = useState(false);
    const [shaking, setShaking] = useState(false);

    const handleConfirmClick = () => {
        if (confirming) onConfirm?.();
        else {
            setConfirming(true);
            setShaking(true);
        }
    }

    useEffect(() => {
        if (confirming) {
            const timeout = setTimeout(() => {
                setConfirming(false);
                setShaking(false);
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [confirming]);

    const colorClasses = {
        red: "bg-red-500 hover:bg-red-600 hover:shadow-[0_0_10px_#f7768e]",
        yellow: "bg-yellow-500 hover:bg-yellow-600 hover:shadow-[0_0_10px_#f7768e]",
        blue: "bg-blue-500 hover:bg-blue-600 hover:shadow-[0_0_10px_#f7768e]",
        green: "bg-green-500 hover:bg-green-600 hover:shadow-[0_0_10px_#f7768e]",
        purple: "bg-purple-500 hover:bg-purple-600 hover:shadow-[0_0_10px_#f7768e]",
    };

    const getDefaultClassName = (colorType: "red" | "yellow" | "blue" | "green" | "purple") => {
        return `flex items-center gap-1 px-3 py-1 rounded-sm text-[#f6faff] transition-all duration-150 ${colorClasses[colorType]}`;
    }

    const getClassName = () => { 
        return className === "" ? getDefaultClassName(color) : className; 
    }
    
    const getConfirmClassName = () => { 
        return confirmClassName === "" ? getDefaultClassName(confirmColor) : confirmClassName; 
    }

    return (
        <button
            type="button"
            onClick={handleConfirmClick}
            className={`cursor-pointer ${confirming ? getConfirmClassName() : getClassName()} ${shaking ? "shake-subtle" : ""}`}
        >
            <Trash2 size={16} strokeWidth={3} />
            {confirming ? confirmLabel : label}
        </button>
    );
};

export default ConfirmDeleteButton;