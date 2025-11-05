interface NoteBlockProps {
    id: number;
    active: boolean;
    onActiveSwitch: (index:number, newValue: boolean) => void;
    content: string;
};
export const NoteBlock = ({ id, active, content, onActiveSwitch }: NoteBlockProps) => {
    const passActive = (value: boolean) => {
        onActiveSwitch?.(id, value);
    };
    return (
        active ?
            <input
                name='noteBody'
                placeholder={'Add note here...'}
                defaultValue={content}
                autoFocus
                onBlur={() => passActive(false)}
            />
            :
            <h3 onClick={() => passActive(true)}>{content}</h3>
    );
}

export default NoteBlock;