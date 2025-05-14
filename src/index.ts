import dotenv from 'dotenv';
import {scrapeHackerNews} from './scrapers/hackerNewsScraper'
import { Article, scrapeNewsAPI, scrapeNewsAPITechCompanies, scrapeNewsAPITechTopics } from './scrapers/newsApiScraper';
import fs from 'fs';
import path from 'path';
import {Story} from './scrapers/hackerNewsScraper'
import { cleanDataStory, cleanDataArticle } from './utils/cleaner';
import { log } from './utils/logger';
import { takeInput } from './utils/user_input';
const DATA_DIR = process.env.DATA_DIR || './data/raw';
const INPUT_FILE_HACK = path.join(DATA_DIR, 'hackernews-batch.json');
const OUTPUT_FILE_HACK = path.join(DATA_DIR, 'hackernews-cleaned.json');

const INPUT_FILE_NEWS = path.join(DATA_DIR, 'newsapi-batch.json');
const OUTPUT_FILE_NEWS = path.join(DATA_DIR, 'newsapi-cleaned.json');

dotenv.config()

async function main() {
    await scrapeHackerNews();
    await scrapeNewsAPI();
    await scrapeNewsAPITechCompanies();
    await scrapeNewsAPITechTopics();
    const rawDataStories = fs.readFileSync(INPUT_FILE_HACK, 'utf-8');
    const stories: Story[] = JSON.parse(rawDataStories);
    const cleanedStories = cleanDataStory(stories);
    fs.writeFileSync(OUTPUT_FILE_HACK, JSON.stringify(cleanedStories, null, 2));
    log(`Cleaned data saved to ${OUTPUT_FILE_HACK}`);
    
    const rawDataArticles = fs.readFileSync(INPUT_FILE_NEWS, 'utf-8');
    const articles: Article[] = JSON.parse(rawDataArticles);
    const cleanedArticles = cleanDataArticle(articles);
    fs.writeFileSync(OUTPUT_FILE_NEWS, JSON.stringify(cleanedArticles, null, 2));
    log(`Cleaned data saved to ${OUTPUT_FILE_NEWS}`);
    takeInput();

}

main();
//npm run start    # Runs the scraper once
//npm run dev      # Runs the scraper with automatic restarts
//npm run build    # Generates updated .js files in the dist folder 
//python src/utils/tfidf.py #Get the vocabulary and consequent tfidf vectorizations of each
