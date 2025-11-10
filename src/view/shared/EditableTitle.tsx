import {  useState } from "react";

interface EditableTitleProps{
    id: number;
    title:string;
    onEdit: (index:number, newValue:string) => void;
};
export const EditableTitle = ({ id, title, onEdit }: EditableTitleProps) => {
    const [active,setActive] = useState(title === '');

    console.log(`active ${id}: ${title === ''}`);
    let clickCount = 0;
    const clickTimeout = 400;

    const checkDoubleClick = () => {
        clickCount++;
        if(clickCount >= 2) {
            setActive(true);
            clickCount = 0;
        }
        setTimeout(() => clickCount = 0,clickTimeout)
    };

    return(
        <>
           { active ? 
                <>
                    <input
                        onChange={(e) => onEdit?.(id,e.target.value)}
                        value={title}
                        autoFocus
                        placeholder="Enter Title..." 
                    />
                    <button 
                        onClick={() => {
                            setActive(false);
                            onEdit?.(id,title);
                        }}>Submit</button>
                </>
            :
                <>
                    <h3 onClick={checkDoubleClick}>{title}</h3>
                    <button onClick={() => setActive(true)}>Edit</button>
                </>
            }
        </>
    );
};
export default EditableTitle;