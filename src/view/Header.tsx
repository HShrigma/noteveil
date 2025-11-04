// This is the navigation bar
const TopBar = () => {
    return (<nav>
        <button name='Tasks'>
            Tasks
        </button>
        <button name='Notes'>
            Notes
        </button>
    </nav>
    );
}

// This is the default Header present on each page
export const DefaultHeader = () => {
    return (
        <>
            <h1> Noteveil </h1>
            <div>
                <TopBar/>
            </div>
        </>
    );
}

export default DefaultHeader;