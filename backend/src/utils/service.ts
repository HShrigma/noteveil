export const runService = <T>(
    operation: () => T,
    errorMessage: string) => {
    try {
        return operation();
    } catch (error) {
        console.error(errorMessage, error);
        return null;
    }
}
