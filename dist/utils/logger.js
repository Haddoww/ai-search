"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = log;
function log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
}
