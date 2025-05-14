"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanTitle = cleanTitle;
exports.cleanDataStory = cleanDataStory;
exports.cleanDataArticle = cleanDataArticle;
const path_1 = __importDefault(require("path"));
const DATA_DIR = process.env.DATA_DIR || './data/raw';
const INPUT_FILE = path_1.default.join(DATA_DIR, 'hackernews-batch.json');
const OUTPUT_FILE = path_1.default.join(DATA_DIR, 'hackernews-cleaned.json');
let stopwords = new Set([
    'the', 'is', 'in', 'at', 'of', 'on', 'and', 'a', 'an', 'to', 'it', 'that', 'this', 'with', 'for', 'from'
]);
//Normalize Urls
function normalizeUrl(url) {
    try {
        const { origin, pathname } = new URL(url);
        return `${origin}${pathname}`.toLowerCase();
    }
    catch {
        return "";
    }
}
// Clean up the title text
function cleanTitle(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') // Remove special characters
        .split(' ')
        .filter(word => !stopwords.has(word)) // Remove stopwords
        .join(' ');
}
function cleanDataStory(stories) {
    const seenUrls = new Set();
    const cleanedStories = [];
    for (const story of stories) {
        const cleanedUrl = normalizeUrl(String(story.url));
        const cleanedTitle = cleanTitle(story.title);
        if (!cleanedUrl || seenUrls.has(cleanedUrl) || !cleanedTitle)
            continue;
        seenUrls.add(cleanedUrl);
        cleanedStories.push({
            ...story,
            title: cleanedTitle
        });
    }
    return cleanedStories;
}
function cleanDataArticle(articles) {
    const seenUrls = new Set();
    const cleanedArticles = [];
    for (const article of articles) {
        const cleanedUrl = normalizeUrl(String(article.url));
        const cleanedTitle = cleanTitle(article.title);
        if (!cleanedUrl || seenUrls.has(cleanedUrl) || !cleanedTitle)
            continue;
        seenUrls.add(cleanedUrl);
        cleanedArticles.push({
            ...article,
            title: cleanedTitle
        });
    }
    return cleanedArticles;
}
