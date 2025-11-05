interface NoteBlockProps {
    id: number;
    active: boolean;
    onContentChange: (index:number, newContent: string) => void;
    onActiveSwitch: (index:number, newValue: boolean) => void;
    content: string;
};
export const NoteBlock = ({ id, active, content, onContentChange, onActiveSwitch }: NoteBlockProps) => {
        
    return (
        active ?
            <input
                name='noteBody'
                placeholder={'Add note here...'}
                defaultValue={content}
                autoFocus
                onBlur={() => onActiveSwitch?.(id, false)}
                onChange={(e) => onContentChange?.(id, e.target.value)}
            />
            :
            <h3 onClick={() => onActiveSwitch?.(id, true)}>{content}</h3>
    );
}

export default NoteBlock;