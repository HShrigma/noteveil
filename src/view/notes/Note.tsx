import React, { useState } from "react";
import NoteBlock from "./NoteBlock";
import { clampArray } from "../utils/mathUtils";
interface NoteProps {
    title: string;
    content: string;
    isActive: boolean;
    onNoteFocus: () => void;
};

type activeBlock =
    {
        index: number, active: boolean
    };

export const Note = ({ title, content, isActive, onNoteFocus }: NoteProps) => {
    const [activeBlock, setActiveBlock] = useState<activeBlock>({ index: 0, active: false });
    const [blocks,setBlocks] = useState(content.split('\n'));

    const handleActiveSwitch = (index: number, value: boolean) => {
        if(isActive){
            setActiveBlock({ index, active: value });
            return;
        }

        setActiveBlock({ index, active: false });
        onNoteFocus?.();
    }
    
    const handleContentChange = (index:number, block: string) => {
        const newBlocks = [...blocks];
        newBlocks[index] = block;
        setBlocks(newBlocks);
    }

    const handleUserInput = (index:number, value: React.KeyboardEvent) => {
        console.log(value.key);
        switch(value.key){
            case 'ArrowUp':
                setActiveBlock({ index: clampArray(index - 1, blocks), active: true });
                break;
            case 'ArrowDown':
                setActiveBlock({ index: clampArray(index + 1, blocks), active: true });
                break;
        }
    };
    return (
        <div>
            <h3>{title}</h3>
            {blocks.map((block, index) =>
                <NoteBlock
                    key={index}
                    id={index}
                    active={activeBlock.index === index ? activeBlock.active : false}
                    content={block}
                    onContentChange={handleContentChange}
                    onActiveSwitch={handleActiveSwitch} 
                    onKeyDown={handleUserInput}
                />)}
        </div>
    );
}

export default Note;