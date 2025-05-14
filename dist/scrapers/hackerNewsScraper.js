"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeHackerNews = scrapeHackerNews;
const logger_1 = require("../utils/logger");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const DATA_DIR = path_1.default.join(__dirname, '../../data/raw');
const FILE_PATH = path_1.default.join(DATA_DIR, 'hackernews-batch.json');
const OUT_PATH = path_1.default.join(DATA_DIR, 'hackernews-cleaned.json');
const HN_API_BASE = 'https://hacker-news.firebaseio.com/v0';
// Ensure data directory exists
if (!fs_1.default.existsSync(DATA_DIR)) {
    fs_1.default.mkdirSync(DATA_DIR, { recursive: true });
}
async function scrapeHackerNews() {
    try {
        (0, logger_1.log)('starting to scrape hacker news...');
        //Get the top story IDs
        const storyIds = (await axios_1.default.get(`${HN_API_BASE}/topstories.json`)).data.slice(0, 100);
        //Get the details from each id
        const stories = await Promise.all(storyIds.map(async (id) => {
            const story = (await axios_1.default.get(`${HN_API_BASE}/item/${id}.json`)).data;
            return {
                title: story.title,
                url: story.url,
                by: story.by,
                time: new Date(Number(story.time) * 1000).toISOString(),
                //text: story.text,
            };
        }));
        if (fs_1.default.existsSync(FILE_PATH)) {
            const existingData = JSON.parse(fs_1.default.readFileSync(FILE_PATH, 'utf-8'));
            const combinedData = [...existingData, ...stories];
            fs_1.default.writeFileSync(FILE_PATH, JSON.stringify(combinedData, null, 2));
        }
        else {
            fs_1.default.writeFileSync(FILE_PATH, JSON.stringify(stories, null, 2));
        }
        (0, logger_1.log)(`Batch data saved to ${FILE_PATH}`);
    }
    catch (error) {
        (0, logger_1.log)(`Error scraping Hacker News:  ${error}`);
    }
}
