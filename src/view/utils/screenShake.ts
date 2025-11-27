export const triggerScreenShake = (duration = 500) => {
    const root = document.getElementById("root");
    if (!root) return;

    root.classList.add("screen-shake");

    setTimeout(() => {
        root.classList.remove("screen-shake");
    }, duration);
};

export const triggerScreenBob = (duration = 350) => {
    const root = document.getElementById("root");
    if (!root) return;

    root.classList.add("screen-bob");

    setTimeout(() => {
        root.classList.remove("screen-bob");
    }, duration);
};
