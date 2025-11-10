import { useState, useEffect, useRef } from "react";

interface EditableTitleProps {
    id: number;
    title: string;
    onEdit: (index: number, newValue: string) => void;
    onSubmit: (index: number) => void;
    autoFocus?: boolean;
};

export const EditableTitle = ({ id, title, onEdit, onSubmit, autoFocus = false }: EditableTitleProps) => {
    const [active, setActive] = useState(title === '');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (title === '') {
            setActive(true);
        }
    }, [title, id]);

    useEffect(() => {
        if (active && inputRef.current && autoFocus) {
            inputRef.current.focus();
        }
    }, [active, autoFocus]);

    const handleSubmit = () => {
        setActive(false);
        onSubmit?.(id);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    let clickCount = 0;
    const clickTimeout = 400;

    const checkDoubleClick = () => {
        clickCount++;
        if(clickCount >= 2) {
            setActive(true);
            clickCount = 0;
        }
        setTimeout(() => clickCount = 0, clickTimeout);
    };

    return(
        <>
           { active ? 
                <>
                    <input
                        ref={inputRef}
                        onChange={(e) => onEdit?.(id, e.target.value)}
                        onKeyDown={handleKeyDown}
                        value={title}
                        placeholder="Enter Title..." 
                    />
                    <button onClick={handleSubmit}>Submit</button>
                </>
            :
                <>
                    <h3 onClick={checkDoubleClick}>{title}</h3>
                    <button onClick={() => setActive(true)}>Edit</button>
                </>
            }
        </>
    );
};
export default EditableTitle;