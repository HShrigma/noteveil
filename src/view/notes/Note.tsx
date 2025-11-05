import { useState } from "react";
import NoteBlock from "./NoteBlock";

interface NoteProps {
    title: string;
    content: string;
};
type activeBlock =
    {
        index: number, active: boolean
    };
export const Note = ({ title, content }: NoteProps) => {
    const [activeBlock, setActiveBlock] = useState<activeBlock>({ index: 0, active: false });
    let blocks = content.split('\n');
    const handleActiveSwitch = (index: number, value: boolean) => {
        console.log(`i:${index}, v:${value}`);
        setActiveBlock({ index, active: value });
    }
    return (
        <div>
            <h3>{title}</h3>
            {blocks.map((block, index) =>
                <NoteBlock
                    key={index}
                    id={index}
                    active={activeBlock.index === index ? activeBlock.active : false}
                    content={block}
                    onActiveSwitch={handleActiveSwitch} 
                />)}
        </div>
    );
}

export default Note;