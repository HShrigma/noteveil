interface NoteBlockProps {
    content: string;
};
export const NoteBlock = ({ content }: NoteBlockProps) => {

    return (<textarea
        name='noteBody'
        placeholder={'Add note here...'}
        value={content}
    />
    );
}

export default NoteBlock;