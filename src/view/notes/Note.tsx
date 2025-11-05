interface NoteProps {
    title: string;
    content: string;
};

export const Note = ({ title, content }: NoteProps) => {

    return (
        <div>

            <h3>{title}</h3>
            <textarea
                name='noteBody'
                placeholder={'Add note here...'}
                value={content}
            />
        </div>
    );
}

export default Note;