export const ecluidianDistance = (v1: number[], v2: number[]): number => {
    if (v1.length !== v2.length) {
        throw new Error("Vectors must be the same length");
    }
    return Math.sqrt(v1.reduce((sum, val, idx) => sum + Math.pow(val - v2[idx], 2), 0));
}