import * as readline from 'readline';
import fs from "fs";
import path from "path";
import {exec} from "child_process";
import { findNearestCluster } from "./cluster_match"
import { rankClusterStories } from "./ranking"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function getQueryVector(query: string) {
    exec(`python ./src/utils/vectorizer.py "${query}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }

        try {
            //turn the query into a query vector so we can search with it
            const vector = JSON.parse(stdout);
            //console.log("Vector:", vector);
            //find the cluster that is clostest based on euclid distance from query vector
            const nearestVector = findNearestCluster(vector)
            console.log(nearestVector);
            //get the title to cluster mappings
            const labels = JSON.parse(fs.readFileSync("data/cluster_assingments.json", "utf-8"));
            const rankedStories = rankClusterStories(nearestVector, vector, labels);

            const cleanedFilePath = path.join(__dirname, "../../data/raw/test.json");
            const cleanedData = JSON.parse(fs.readFileSync(cleanedFilePath, 'utf-8'));

            console.log("\nTop search results");
            rankedStories.forEach(({ index, score }, rank) => {
                const {title, url} = cleanedData[index];
                console.log(`${rank + 1}. [${title}](${url}) - Score: ${score.toFixed(4)}`);
            });
        } catch (parseError) {
            console.error("Failed to parse vector:", parseError);
        }
    });
}

export function takeInput() {
    rl.setPrompt("Enter your query: ");
    rl.prompt();

    rl.on('line', async (query) => {
        await getQueryVector(query);
        rl.close();
    });
}