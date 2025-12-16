import { Edit } from "lucide-react";

export interface InactiveTitleProps{
    title:string;
    onActiveRequest: () => void;
}
export const InactiveTitle = ({ title, onActiveRequest }: InactiveTitleProps) => {
    return (
    <div className="flex items-center gap-2">
                    <h3
                        onClick={onActiveRequest}
                        className="flex-1 text-purple-400 font-bold tracking-wide cursor-pointer"
                    >
                        {title}
                    </h3>
                    <button
                        className="p-2 rounded-sm bg-transparent border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-[#f6e0ff] hover:shadow-[0_0_8px_#9d7cd8] transition-all duration-150"
                        onClick={onActiveRequest}
                    >
                        <Edit size={18} strokeWidth={3} />
                    </button>
                </div>
);
}

export default InactiveTitle;