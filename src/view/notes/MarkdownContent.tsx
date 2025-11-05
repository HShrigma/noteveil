interface MarkdownContentProps{
    id: number;
    content:string;
    onActiveSwitch: (index: number, newValue: boolean) => void;
};
export const MarkdownContent = ({id, content, onActiveSwitch }: MarkdownContentProps) => {
    const interpretMD = () => {
        if(content[0] === '#'){
            if(content[1] === '#'){
                if (content[2] === '#') return <h3>{content.slice(3)}</h3>
                return <h2>{content.slice(2)}</h2>
            } 
            return <h1>{content.slice(1)}</h1>
        }
        return content;
    };

    const renderContent = () => {
        switch (content) {
            case '':
                return <br/>
            default:
                return interpretMD();
        }
    };
    return (
            <div onClick={() => onActiveSwitch?.(id, true)}>{renderContent()}</div>
    );
};
export default MarkdownContent;