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
    const onKeyDownHandler = (input: React.KeyboardEvent) => {
        switch(input.key){
            case "Enter":
                if(input.ctrlKey) onNoteFocus?.({index:id, active:false});
                break;
            case "Tab":
                input.preventDefault();
                if(input.shiftKey){
                    onNoteFocus?.({index:id+1, active:true});
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
                <textarea
                    name='noteBody'
                    placeholder={'Add note here...'}
                    value={content}
                    autoFocus
                    onChange={(e) => onContentChange?.(id, e.target.value)
                    }
                    onKeyDown={onKeyDownHandler}
                />
                :
                <div onClick={() => onNoteFocus?.({index:id, active:true})}>
                    <Markdown>{content}</Markdown>
                </div>

            }
        </div>
    );
}

export default Note;