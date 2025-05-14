"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rankClusterStories = exports.cosineSimilarity = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cosineSimilarity = (v1, v2) => {
    const dotProduct = v1.reduce((sum, val, idx) => sum + val * v2[idx], 0);
    const magA = Math.sqrt(v1.reduce((sum, val) => sum + val * val, 0));
    const magB = Math.sqrt(v2.reduce((sum, val) => sum + val * val, 0));
    if (magA === 0 || magB === 0) {
        return 0;
    }
    return dotProduct / (magA * magB);
};
exports.cosineSimilarity = cosineSimilarity;
const rankClusterStories = (clusterIdx, queryVector, labels) => {
    const filePath = path_1.default.join(__dirname, "../../data/raw/tfidf.json");
    const tfidfData = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
    const matrix = tfidfData.tfidf_matrix;
    const clusterVectors = matrix
        .map((vector, index) => ({ vector, index }))
        .filter(({ index }) => labels[index] === clusterIdx);
    const scoredDocs = clusterVectors.map(({ vector, index }) => ({
        index,
        score: (0, exports.cosineSimilarity)(queryVector, vector),
    }));
    scoredDocs.sort((a, b) => b.score - a.score);
    return scoredDocs;
};
exports.rankClusterStories = rankClusterStories;
