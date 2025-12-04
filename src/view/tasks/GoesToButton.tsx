interface GoesToButtonProps{
    onGoesTo?: () => void;
};

export const GoesToButton = ({onGoesTo: OnGoesTo}:GoesToButtonProps) => {
    return(
            <button 
                className="flex items-center gap-2 px-2 rounded-2xl border-2 border-purple-500 bg-purple-500 
                     text-[#f6faff] hover:bg-[#bb9af7] hover:shadow-[0_0_10px_#bb9af7] transition-all duration-150"
                onClick={OnGoesTo}>
                Goes To
            </button>
    );
};
export default GoesToButton;