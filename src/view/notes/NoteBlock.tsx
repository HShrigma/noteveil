interface NoteBlockProps {
    id: number;
    active: boolean;
    onContentChange: (index: number, newContent: string) => void;
    onActiveSwitch: (index: number, newValue: boolean) => void;
    onKeyDown: (index: number, value: React.KeyboardEvent) => void;
    content: string;
};
export const NoteBlock = ({ id, active, content, onContentChange, onActiveSwitch, onKeyDown }: NoteBlockProps) => {

    return (
        active ?
            <input
                name='noteBody'
                placeholder={'Add note here...'}
                defaultValue={content}
                autoFocus
                onBlur={() => onActiveSwitch?.(id, false)}
                onChange={(e) => onContentChange?.(id, e.target.value)}
                onKeyDown={(e) => onKeyDown?.(id, e)}
            />
            : content === '' ?
                <h3 onClick={() => onActiveSwitch?.(id, true)}> <br></br> </h3>
                :
                <h3 onClick={() => onActiveSwitch?.(id, true)}>{content}</h3>
    );
}

export default NoteBlock;