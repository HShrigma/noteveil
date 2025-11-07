import React, { useState } from "react";
import NoteBlock from "./NoteBlock";
import { clampArray } from "../utils/mathUtils";
import { NoteBlockSeparator } from "../utils/registries";

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
    const [blocks, setBlocks] = useState(content.split(NoteBlockSeparator));

    const handleActiveSwitch = (index: number, value: boolean) => {
        if (isActive) {
            setActiveBlock({ index, active: value });
            return;
        }

        setActiveBlock({ index, active: false });
        onNoteFocus?.();
    }

    const handleContentChange = (index: number, block: string) => {
        const newBlocks = [...blocks];
        newBlocks[index] = block;
        setBlocks(newBlocks);
    };

    const insertNewBlock = (index: number) => {
        const newBlocks = [...blocks];
        if (index >= blocks.length) {
            newBlocks.push('');
        }
        else {
            newBlocks.splice(index, 0, '');
        }
        setBlocks(newBlocks);
    };
    const removeBlock = (index: number) => {
        const newBlocks = [...blocks];
        newBlocks.splice(index, 1);
        setBlocks(newBlocks);
    }
    const handleUserInput = (index: number, value: React.KeyboardEvent) => {
        switch (value.key) {
            case 'ArrowUp':
                setActiveBlock({ index: clampArray(index - 1, blocks), active: true });
                break;
            case 'ArrowDown':
                setActiveBlock({ index: clampArray(index + 1, blocks), active: true });
                break;
            case 'Enter':
                value.preventDefault();
                insertNewBlock(index + 1);
                setActiveBlock({ index: index + 1, active: true });
                break;
            case 'Backspace':
                if (blocks[index] === '' && blocks.length > 1 && index !== 0) {
                    removeBlock(index);
                    setActiveBlock({ index: index - 1, active: true });
                }
                break;
            case 'Tab':
                value.preventDefault();
                const input = value.currentTarget as HTMLInputElement;
                const cursorPos = input.selectionStart ?? 0;
                const newContent = blocks[index].substring(0, cursorPos) + '  ' + blocks[index].substring(cursorPos);
                handleContentChange(index, newContent);
                setTimeout(() => {
                    input.selectionStart = cursorPos + 2;
                    input.selectionEnd = cursorPos + 2;
                }, 0);
                break;
            default: break;
        };
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