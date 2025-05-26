"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.takeInput = takeInput;
const readline = __importStar(require("readline"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const cluster_match_1 = require("./cluster_match");
const ranking_1 = require("./ranking");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
async function getQueryVector(query) {
    (0, child_process_1.exec)(`python ./src/utils/vectorizer.py "${query}"`, (error, stdout, stderr) => {
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
            const nearestVector = (0, cluster_match_1.findNearestCluster)(vector);
            console.log(nearestVector);
            //get the title to cluster mappings
            const labels = JSON.parse(fs_1.default.readFileSync("data/cluster_assingments.json", "utf-8"));
            const rankedStories = (0, ranking_1.rankClusterStories)(nearestVector, vector, labels);
            const cleanedFilePath = path_1.default.join(__dirname, "../../data/raw/test.json");
            const cleanedData = JSON.parse(fs_1.default.readFileSync(cleanedFilePath, 'utf-8'));
            console.log("\nTop search results");
            // rankedStories.forEach(({ index, score }, rank) => {
            //     const {title, url} = cleanedData[index];
            //     if (rank < 10) {
            //         console.log(`${rank + 1}. [${title}](${url}) - Score: ${score.toFixed(4)}`);
            //     }
            // });
            let rank = 0;
            for (const story of rankedStories) {
                const { title, url } = cleanedData[story.index];
                if (rank == 0 && story.score == 0.00000) {
                    console.log('No available results');
                    break;
                }
                if (story.score > 0.00000000) {
                    console.log(`${rank + 1}. [${title}](${url}) - Score: ${story.score.toFixed(4)}`);
                }
                rank += 1;
            }
        }
        catch (parseError) {
            console.error("Failed to parse vector:", parseError);
        }
    });
}
function takeInput() {
    rl.setPrompt("Enter your query: ");
    rl.prompt();
    rl.on('line', async (query) => {
        await getQueryVector(query);
        rl.close();
    });
}
