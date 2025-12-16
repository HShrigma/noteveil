import InactiveTitle from "./InactiveTitle";
import ActiveTitle from "./ActiveTitle";

interface EditableTitleProps {
    title: string;
    isActive?: boolean;
    onActivityRequest?: (wantsActive: boolean, value:string) => void;
    onSubmit: (newValue: string) => void;
}

export const EditableTitle = ({ title, isActive, onActivityRequest, onSubmit }: EditableTitleProps) => {
    const handleDiscard = () => onActivityRequest?.(false, title);
    const handleSubmit = (newValue: string) => onSubmit(newValue);

    return (
        isActive ? <ActiveTitle 
            title={title} 
            onDiscard={handleDiscard} 
            onChange={(value) => onActivityRequest?.(true, value)}
            onSubmit={handleSubmit}
        />
            :
            <InactiveTitle 
                title={title}
                onActiveRequest={() => onActivityRequest?.(true, title)} />
    );
};

export default EditableTitle;
