import User from "./user/User";

const HeaderTop = () => {

    return (
        <div className="flex justify-between items-center">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-purple-400 tracking-wider">
                Noteveil
            </h1>
            {/* User */}
            <User/>
        </div>
    );
};

export default HeaderTop;
