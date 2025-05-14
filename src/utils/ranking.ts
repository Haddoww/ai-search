import fs from "fs";
import path from "path";

type DocumnetVector = {
    vector: number[],
    index: number

}
type ScoredDocument = {
    index: number,
    score: number
}

export const cosineSimilarity = (v1: number[], v2: number[]): number => {
    const dotProduct = v1.reduce((sum, val, idx) => sum + val * v2[idx], 0);
    const magA = Math.sqrt(v1.reduce((sum, val)=> sum + val * val, 0));
    const magB = Math.sqrt(v2.reduce((sum, val) => sum + val * val, 0));

    if (magA === 0 || magB === 0) {
        return 0;
    }
    return dotProduct / (magA* magB);
}

export const rankClusterStories = (clusterIdx: number, queryVector: number[], labels: number[]) => {
    const filePath = path.join(__dirname, "../../data/raw/tfidf.json");
    const tfidfData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const matrix = tfidfData.tfidf_matrix;
    
    const clusterVectors : DocumnetVector[] = matrix
        .map((vector: number[], index: number) => ({ vector, index }))
        .filter(({ index }: DocumnetVector) => labels[index] === clusterIdx);


    const scoredDocs: ScoredDocument[] = clusterVectors.map(({vector, index}) => ({
        index, 
        score: cosineSimilarity(queryVector, vector),
    }));

    scoredDocs.sort((a, b) => b.score - a.score);

    return scoredDocs
}


