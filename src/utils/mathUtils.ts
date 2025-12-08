export const clamp = (value: number, min: number, max: number) => {
    return value < min ? min : value > max ? max : value;
};


export const clampArray = <T>(index: number, array: T[]) => {
    return clamp(index, 0, array.length - 1);
};