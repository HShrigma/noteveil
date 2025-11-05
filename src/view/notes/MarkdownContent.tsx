interface MarkdownContentProps {
    id: number;
    content: string;
    onActiveSwitch: (index: number, newValue: boolean) => void;
};
export const MarkdownContent = ({ id, content, onActiveSwitch }: MarkdownContentProps) => {

    const renderStyled = () => {
       return content; 
    }
    const isHeader = () => {
        return content[0] === '#';
    }
    const renderHeader = () => {
        if (content[1] === '#') {
            if (content[2] === '#') return <h3>{renderStyled().slice(3)}</h3>
            return <h2>{renderStyled().slice(2)}</h2>
        }
        return <h1>{renderStyled().slice(1)}</h1>
    }
    const interpretMD = () => {
        if(isHeader()) return renderHeader();
        return renderStyled();
    };

    const renderContent = () => {
        // Render special inputs if any
        switch (content) {
            case '':
                return <br />
            case '---':
                return <hr />
            default:
                return interpretMD();
        }
    };
    return (
        <div onClick={() => onActiveSwitch?.(id, true)}>{renderContent()}</div>
    );
};
export default MarkdownContent;