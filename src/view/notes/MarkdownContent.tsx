import Markdown from "react-markdown";

interface MarkdownContentProps {
    id: number;
    content: string;
    onActiveSwitch: (index: number, newValue: boolean) => void;
};
export const MarkdownContent = ({ id, content, onActiveSwitch }: MarkdownContentProps) => {
    return (
        <div onClick={() => onActiveSwitch?.(id, true)}>
            <Markdown>{content}</Markdown>
        </div>
    );
};
export default MarkdownContent;