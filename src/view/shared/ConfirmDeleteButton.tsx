import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

interface ConfirmDeleteButtonProps {
    onConfirm: () => void;
    className?: string;
    confirmClassName?: string;
    label?: string;
    confirmLabel?: string;
}
export const ConfirmDeleteButton = ({ onConfirm, className = "", confirmClassName = "", label = "", confirmLabel = "Are you Sure?" }: ConfirmDeleteButtonProps) => {
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
                setShaking(true);
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [confirming]);

    const getDefaultClassName = (color?:string) => {
        if(!color) color="red";
        return `flex items-center gap-1 px-3 py-1 rounded-sm bg-${color}-500 text-[#f6faff] hover:bg-${color}-600 hover:shadow-[0_0_10px_#f7768e] transition-all duration-150`;
    }
    const getClassName = () => { return className == "" ? getDefaultClassName("red") : className; }
    const getConfirmClassName = () => { return confirmClassName == "" ? getDefaultClassName("yellow") : confirmClassName; }


    return <button
        type="button"
        onClick={handleConfirmClick}
        className={ `${confirming ? getConfirmClassName() : getClassName()} ${shaking ? "shake-subtle": ""}`}
    >
        <Trash2 size={16} strokeWidth={3} />
        {confirming ? confirmLabel : label}
    </button>
        ;
}

export default ConfirmDeleteButton;