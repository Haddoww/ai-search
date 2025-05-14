"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeNewsAPI = scrapeNewsAPI;
exports.scrapeNewsAPITechCompanies = scrapeNewsAPITechCompanies;
exports.scrapeNewsAPITechTopics = scrapeNewsAPITechTopics;
const logger_1 = require("../utils/logger");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const DATA_DIR = path_1.default.join(__dirname, '../../data/raw');
const FILE_PATH2 = path_1.default.join(DATA_DIR, 'newsapi-batch.json');
const OUT_PATH = path_1.default.join(DATA_DIR, 'hackernews-cleaned.json');
const API_Key = '162b1ef131d74e98ad0f6ce974d94894';
// Ensure data directory exists
if (!fs_1.default.existsSync(DATA_DIR)) {
    fs_1.default.mkdirSync(DATA_DIR, { recursive: true });
}
async function scrapeNewsAPI() {
    try {
        (0, logger_1.log)('starting to scrape news api...');
        const response = await axios_1.default.get('https://newsapi.org/v2/top-headlines', {
            params: {
                category: 'technology',
                language: 'en',
                pageSize: 100,
                page: 1
            },
            headers: {
                'X-Api-Key': API_Key
            }
        });
        (0, logger_1.log)("Got the responses");
        const newArticles = response.data.articles.map((article) => ({
            title: article.title,
            url: article.url,
            author: article.author,
            publishedAt: article.publishedAt
        }));
        let existingData = [];
        if (fs_1.default.existsSync(FILE_PATH2)) {
            existingData = JSON.parse(fs_1.default.readFileSync(FILE_PATH2, 'utf-8'));
        }
        const combinedData = [...existingData, ...newArticles];
        fs_1.default.writeFileSync(FILE_PATH2, JSON.stringify(combinedData, null, 2));
        (0, logger_1.log)("Files synced");
    }
    catch (error) {
        (0, logger_1.log)("There was an error trying to pull from the news api");
        console.error(error);
    }
}
async function scrapeNewsAPITechCompanies() {
    try {
        (0, logger_1.log)('starting to scrape news api Tech...');
        const response = await axios_1.default.get('https://newsapi.org/v2/everything', {
            params: {
                qInTitle: 'Amazon OR Microsoft OR AWS OR Google OR OpenAI OR Apple OR Meta',
                language: 'en',
                pageSize: 100,
                page: 1
            },
            headers: {
                'X-Api-Key': API_Key
            }
        });
        (0, logger_1.log)("Got the responses");
        const newArticles = response.data.articles.map((article) => ({
            title: article.title,
            url: article.url,
            author: article.author,
            publishedAt: article.publishedAt
        }));
        let existingData = [];
        if (fs_1.default.existsSync(FILE_PATH2)) {
            existingData = JSON.parse(fs_1.default.readFileSync(FILE_PATH2, 'utf-8'));
        }
        const combinedData = [...existingData, ...newArticles];
        fs_1.default.writeFileSync(FILE_PATH2, JSON.stringify(combinedData, null, 2));
        (0, logger_1.log)("Files synced");
    }
    catch (error) {
        (0, logger_1.log)("There was an error trying to pull from the news api");
        console.error(error);
    }
}
async function scrapeNewsAPITechTopics() {
    try {
        (0, logger_1.log)('starting to scrape news api Tech...');
        const response = await axios_1.default.get('https://newsapi.org/v2/everything', {
            params: {
                qInTitle: 'AI OR startup OR venture OR IPO OR VC OR YC OR Y-Combinator OR Y-combinator OR a16z OR learning',
                language: 'en',
                pageSize: 100,
                page: 1
            },
            headers: {
                'X-Api-Key': API_Key
            }
        });
        (0, logger_1.log)("Got the responses");
        const newArticles = response.data.articles.map((article) => ({
            title: article.title,
            url: article.url,
            author: article.author,
            publishedAt: article.publishedAt
        }));
        let existingData = [];
        if (fs_1.default.existsSync(FILE_PATH2)) {
            existingData = JSON.parse(fs_1.default.readFileSync(FILE_PATH2, 'utf-8'));
        }
        const combinedData = [...existingData, ...newArticles];
        fs_1.default.writeFileSync(FILE_PATH2, JSON.stringify(combinedData, null, 2));
        (0, logger_1.log)("Files synced");
    }
    catch (error) {
        (0, logger_1.log)("There was an error trying to pull from the news api");
        console.error(error);
    }
}
