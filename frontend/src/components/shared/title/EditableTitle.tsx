import InactiveTitle from "./InactiveTitle";
import ActiveTitle from "./ActiveTitle";

interface EditableTitleProps {
    title: string;
    isActive?: boolean;
    onActivityRequest?: (wantsActive:boolean) => void;
    onSubmit: (newValue: string) => void;
}

export const EditableTitle = ({ title = '', isActive, onActivityRequest, onSubmit }: EditableTitleProps) => {
    const handleDiscard = () => onActivityRequest?.(false);
    const handleSubmit = (newValue: string) => onSubmit(newValue);

    return (
        isActive ? <ActiveTitle 
            title={title} 
            onDiscard={handleDiscard} 
            onSubmit={handleSubmit}
        />
            :
            <InactiveTitle 
                title={title}
                onActiveRequest={() => onActivityRequest?.(true)} />
    );
};

export default EditableTitle;
