interface MarkdownContentProps{
    id: number;
    content:string;
    onActiveSwitch: (index: number, newValue: boolean) => void;
};
export const MarkdownContent = ({id, content, onActiveSwitch }: MarkdownContentProps) => {
    return (
             content === '' ?
                <h3 onClick={() => onActiveSwitch?.(id, true)}> <br></br> </h3>
                :
            <h3 onClick={() => onActiveSwitch?.(id, true)}>{content}</h3>
    );
};
export default MarkdownContent;