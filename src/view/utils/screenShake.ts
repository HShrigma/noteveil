export const triggerScreenShake = (timeout?: number) => {
    const root = document.getElementById("root");
    if (!root) return;

    if(!timeout) timeout = 500;
    root.classList.add("screen-shake");

    setTimeout(() => {
        root.classList.remove("screen-shake");
    }, timeout);
};
