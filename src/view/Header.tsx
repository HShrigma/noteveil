// This is the default Header present on each page

import { MAIN_STATES, type MainState } from "./utils/registries";

interface DefaultHeaderProps{
    onScreenChange: (value: MainState) => void;
}
export const DefaultHeader = ({onScreenChange}:DefaultHeaderProps) => {

    const handleClick = (value: MainState) => {
        onScreenChange?.(value);
    }
    // Navigation bar
    const TopBar = () => {
        return (
        <nav>
            <button name='Tasks'
                    onClick={() => handleClick(MAIN_STATES.TASK_DISPLAY)}
                >
                Tasks
            </button>
            <button name='Notes'
                    onClick={() => handleClick(MAIN_STATES.NOTES_DISPLAY)}
                >
                Notes
            </button>
        </nav>
        );
    }

    return (
        <>
            <h1> Noteveil </h1>
            <div>
                <TopBar />
            </div>
        </>
    );
}

export default DefaultHeader;