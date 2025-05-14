"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ecluidianDistance = void 0;
const ecluidianDistance = (v1, v2) => {
    if (v1.length !== v2.length) {
        throw new Error("Vectors must be the same length");
    }
    return Math.sqrt(v1.reduce((sum, val, idx) => sum + Math.pow(val - v2[idx], 2), 0));
};
exports.ecluidianDistance = ecluidianDistance;
