interface MarkdownContentProps {
    id: number;
    content: string;
    onActiveSwitch: (index: number, newValue: boolean) => void;
};
export const MarkdownContent = ({ id, content, onActiveSwitch }: MarkdownContentProps) => {
    const renderStyled = (input: string = content) => {
        const parts: React.ReactNode[] = [];
        let i = 0;
        let elCount = 0;

        while (i < input.length) {
            // Look for formatting markers
            if (input.startsWith('***', i)) {
                const end = input.indexOf('***', i + 3);
                if (end !== -1) {
                    const textInside = input.substring(i + 3, end);
                    parts.push(<strong key={elCount++}><em>{textInside}</em></strong>);
                    i = end + 3;
                    continue;
                }
            }
            else if (input.startsWith('**', i)) {
                const end = input.indexOf('**', i + 2);
                if (end !== -1) {
                    const textInside = input.substring(i + 2, end);
                    parts.push(<strong key={elCount++}>{textInside}</strong>);
                    i = end + 2;
                    continue;
                }
            }
            else if (input.startsWith('*', i)) {
                const end = input.indexOf('*', i + 1);
                if (end !== -1) {
                    const textInside = input.substring(i + 1, end);
                    parts.push(<em key={elCount++}>{textInside}</em>);
                    i = end + 1;
                    continue;
                }
            }

            // No formatting found - collect plain text until next potential marker
            let plainTextEnd = i + 1;
            while (plainTextEnd < input.length &&
                !input.startsWith('*', plainTextEnd)) {
                plainTextEnd++;
            }

            const plainText = input.substring(i, plainTextEnd);
            if (plainText) parts.push(plainText);
            i = plainTextEnd;
        }

        return <span>{parts}</span>;
    }
    const isHeader = () => {
        return content[0] === '#';
    }
    const renderHeader = () => {
        if (content[1] === '#') {
            if (content[2] === '#') return <h3>{renderStyled(content.slice(3))}</h3>
            return <h2>{renderStyled(content.slice(2))}</h2>
        }
        return <h1>{renderStyled(content.slice(1))}</h1>
    }
    const interpretMD = () => {
        if (isHeader()) return renderHeader();
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