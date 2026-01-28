export const FullScreenLoader = () => {
    return (
        <div
            className="fixed inset-0 flex flex-col items-center justify-center z-50"
            style={{
                backgroundColor: "var(--tokyo-night-bg)",
                color: "var(--tokyo-night-foreground)",
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            }}
        >
            <div className="spinner mb-4" />
            <h3 className="text-lg font-medium">Authenticating...</h3>
        </div>
    );
};

export default FullScreenLoader;
