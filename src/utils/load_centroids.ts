import fs from 'fs';
import path from 'path';


export const loadCentroids = (): number[][] => {
    const filePath = path.join(__dirname, "../../data/cluster_centers.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(rawData);
}