"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findNearestCluster = void 0;
const load_centroids_1 = require("./load_centroids");
const distance_1 = require("./distance");
const findNearestCluster = (queryVector) => {
    const centroids = (0, load_centroids_1.loadCentroids)();
    let closestCluster = -1;
    let min_dist = Infinity;
    for (let i = 0; i < centroids.length; i++) {
        const distance = (0, distance_1.ecluidianDistance)(queryVector, centroids[i]);
        if (distance < min_dist) {
            min_dist = distance;
            closestCluster = i;
        }
    }
    return closestCluster;
};
exports.findNearestCluster = findNearestCluster;
