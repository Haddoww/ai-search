import { loadCentroids } from "./load_centroids"
import { ecluidianDistance } from "./distance"


export const findNearestCluster = (queryVector: number[]): number => {
    const centroids = loadCentroids();
    let closestCluster = -1;
    let min_dist = Infinity;

    for (let i = 0; i < centroids.length; i++) {
        const distance = ecluidianDistance(queryVector, centroids[i]);
        if (distance < min_dist) {
            min_dist = distance;
            closestCluster = i;
        }
    }
    return closestCluster;
}