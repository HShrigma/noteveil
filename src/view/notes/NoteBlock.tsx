import { useState } from "react";

interface NoteBlockProps {
    key: number;
    content: string;
};
export const NoteBlock = ({ content }: NoteBlockProps) => {
    const [active, setActive] = useState(false);

    return (
        active ? 
            <input
            name='noteBody'
            placeholder={'Add note here...'}
            value={content}
            onBlur={() => setActive(false)}
            /> 
        : 
            <h3 onClick={() => setActive(true)}>{content}</h3>
    );
}

export default NoteBlock;