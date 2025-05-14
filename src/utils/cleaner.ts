import fs from 'fs';
import path from 'path';
import {Story} from '../scrapers/hackerNewsScraper'
import { Article } from '../scrapers/newsApiScraper';

const DATA_DIR = process.env.DATA_DIR || './data/raw';
const INPUT_FILE = path.join(DATA_DIR, 'hackernews-batch.json');
const OUTPUT_FILE = path.join(DATA_DIR, 'hackernews-cleaned.json');


let stopwords = new Set([
    'the', 'is', 'in', 'at', 'of', 'on', 'and', 'a', 'an', 'to', 'it', 'that', 'this', 'with', 'for', 'from'
]);


//Normalize Urls
function normalizeUrl(url: string): string {
    try {
        const {origin, pathname} = new URL(url);
        return `${origin}${pathname}`.toLowerCase();
    } catch {
        return "";
    }
}

// Clean up the title text
export function cleanTitle(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')  // Remove special characters
        .split(' ')
        .filter(word => !stopwords.has(word))  // Remove stopwords
        .join(' ');
}

export function cleanDataStory(stories: Story[]): Story[] {
    const seenUrls = new Set<string>();
    const cleanedStories: Story[] = [];

    for (const story of stories) {
        const cleanedUrl = normalizeUrl(String(story.url));
        const cleanedTitle = cleanTitle(story.title);

        if (!cleanedUrl || seenUrls.has(cleanedUrl) || !cleanedTitle) continue;

        seenUrls.add(cleanedUrl);
        cleanedStories.push({
            ...story,
            title: cleanedTitle
        });
    }
    return cleanedStories;
}


export function cleanDataArticle(articles: Article[]): Article[] {
    const seenUrls = new Set<string>();
    const cleanedArticles: Article[] = [];

    for (const article of articles) {
        const cleanedUrl = normalizeUrl(String(article.url));
        const cleanedTitle = cleanTitle(article.title);

        if (!cleanedUrl || seenUrls.has(cleanedUrl) || !cleanedTitle) continue;

        seenUrls.add(cleanedUrl);
        cleanedArticles.push({
            ...article,
            title: cleanedTitle
        });
    }
    return cleanedArticles;
}