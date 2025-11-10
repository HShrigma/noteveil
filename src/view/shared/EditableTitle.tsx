import { useState } from "react";

interface EditableTitleProps{
    id: number;
    title:string;
    onEdit: (index:number, newValue:string) => void;
};
export const EditableTitle = ({ id, title, onEdit }: EditableTitleProps) => {
    const [active,setActive] = useState(title == "");
    return(
        <>
           { active ? 
                <>
                    <input
                        onChange={(e) => onEdit?.(id,e.target.value)}
                        value={title}
                        placeholder="Enter Title..." 
                    />
                </>
            :
                <>
                    <h3>{title}</h3>
                    <button onClick={() => setActive(true)}>Edit</button>
                </>
            }
        </>
    );
};
export default EditableTitle;