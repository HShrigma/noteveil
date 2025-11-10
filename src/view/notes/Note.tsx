import Markdown from "react-markdown";
import type { NoteActivity } from "../utils/registries";
interface NoteProps {
    id: number;
    title: string;
    content: string;
    isActive: boolean;
    onNoteFocus: (value: NoteActivity) => void;
    onContentChange: (id: number, content: string) => void;
};

export const Note = ({ id, title, content, isActive, onNoteFocus, onContentChange }: NoteProps) => {
    const signalInactive = () => { onNoteFocus?.({ index: id, active: false }); };

    const onKeyDownHandler = (input: React.KeyboardEvent) => {
        switch (input.key) {
            case "Enter":
                if (input.ctrlKey) signalInactive();
                break;
            case "Tab":
                input.preventDefault();
                if (input.shiftKey) {
                    onNoteFocus?.({ index: id + 1, active: true });
                }
                else {
                    const target = input.currentTarget as HTMLTextAreaElement;
                    const start = target.selectionStart;
                    const end = target.selectionEnd;

                    // Insert two spaces at cursor position
                    const newValue =
                        content.substring(0, start) + "  " + content.substring(end);

                    // Update the content
                    onContentChange?.(id, newValue);

                    // Move cursor after inserted spaces (handled in next tick)
                    requestAnimationFrame(() => {
                        target.selectionStart = target.selectionEnd = start + 2;
                    });
                }
                break;
            default:
                break;
        }
    }
    return (
        <div>
            <h3>{title}</h3>
            {isActive ?
                <div>
                    <textarea
                        name='noteBody'
                        placeholder={'Add note here...'}
                        value={content}
                        autoFocus
                        onChange={(e) => onContentChange?.(id, e.target.value)
                        }
                        onKeyDown={onKeyDownHandler}
                    />
                    <button onClick={signalInactive}>Submit</button>
                </div>
                :
                <div onClick={() => onNoteFocus?.({ index: id, active: true })}>
                    <Markdown>{content}</Markdown>
                </div>

            }
        </div>
    );
}

export default Note;