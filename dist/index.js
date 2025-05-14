"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const hackerNewsScraper_1 = require("./scrapers/hackerNewsScraper");
const newsApiScraper_1 = require("./scrapers/newsApiScraper");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cleaner_1 = require("./utils/cleaner");
const logger_1 = require("./utils/logger");
const user_input_1 = require("./utils/user_input");
const DATA_DIR = process.env.DATA_DIR || './data/raw';
const INPUT_FILE_HACK = path_1.default.join(DATA_DIR, 'hackernews-batch.json');
const OUTPUT_FILE_HACK = path_1.default.join(DATA_DIR, 'hackernews-cleaned.json');
const INPUT_FILE_NEWS = path_1.default.join(DATA_DIR, 'newsapi-batch.json');
const OUTPUT_FILE_NEWS = path_1.default.join(DATA_DIR, 'newsapi-cleaned.json');
dotenv_1.default.config();
async function main() {
    await (0, hackerNewsScraper_1.scrapeHackerNews)();
    await (0, newsApiScraper_1.scrapeNewsAPI)();
    await (0, newsApiScraper_1.scrapeNewsAPITechCompanies)();
    await (0, newsApiScraper_1.scrapeNewsAPITechTopics)();
    const rawDataStories = fs_1.default.readFileSync(INPUT_FILE_HACK, 'utf-8');
    const stories = JSON.parse(rawDataStories);
    const cleanedStories = (0, cleaner_1.cleanDataStory)(stories);
    fs_1.default.writeFileSync(OUTPUT_FILE_HACK, JSON.stringify(cleanedStories, null, 2));
    (0, logger_1.log)(`Cleaned data saved to ${OUTPUT_FILE_HACK}`);
    const rawDataArticles = fs_1.default.readFileSync(INPUT_FILE_NEWS, 'utf-8');
    const articles = JSON.parse(rawDataArticles);
    const cleanedArticles = (0, cleaner_1.cleanDataArticle)(articles);
    fs_1.default.writeFileSync(OUTPUT_FILE_NEWS, JSON.stringify(cleanedArticles, null, 2));
    (0, logger_1.log)(`Cleaned data saved to ${OUTPUT_FILE_NEWS}`);
    (0, user_input_1.takeInput)();
}
main();
//npm run start    # Runs the scraper once
//npm run dev      # Runs the scraper with automatic restarts
//npm run build    # Generates updated .js files in the dist folder 
//python src/utils/tfidf.py #Get the vocabulary and consequent tfidf vectorizations of each
