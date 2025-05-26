import { log } from '../utils/logger'
import fs from 'fs';
import path from 'path';
import axios from 'axios';

const DATA_DIR = path.join(__dirname, '../../data/raw');
const FILE_PATH2 = path.join(DATA_DIR, 'newsapi-batch.json');
const OUT_PATH = path.join(DATA_DIR, 'hackernews-cleaned.json');
const API_Key = 'key';

export interface Article {
    title: string;
    url: string;
    author: string;
    publishedAt: string;
}


interface NewsApiResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}


// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}


export async function scrapeNewsAPI() {
    try {
        log('starting to scrape news api...');
        const response = await axios.get<NewsApiResponse>('https://newsapi.org/v2/top-headlines', {
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
        log("Got the responses");
        const newArticles = response.data.articles.map((article: Article) => ({
            title: article.title,
            url: article.url,
            author: article.author,
            publishedAt: article.publishedAt
        }));

        let existingData: Article[] = []
        
        if (fs.existsSync(FILE_PATH2)) {
            existingData = JSON.parse(fs.readFileSync(FILE_PATH2, 'utf-8'));
        }
        const combinedData = [...existingData, ...newArticles];
        fs.writeFileSync(FILE_PATH2, JSON.stringify(combinedData, null, 2));
        log("Files synced")          
    } catch (error) {
        log("There was an error trying to pull from the news api");
        console.error(error);
    }
}




export async function scrapeNewsAPITechCompanies() {
    try {
        log('starting to scrape news api Tech...');
        const response = await axios.get<NewsApiResponse>('https://newsapi.org/v2/everything', {
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
        log("Got the responses");
        const newArticles = response.data.articles.map((article: Article) => ({
            title: article.title,
            url: article.url,
            author: article.author,
            publishedAt: article.publishedAt
        }));

        let existingData: Article[] = []
        
        if (fs.existsSync(FILE_PATH2)) {
            existingData = JSON.parse(fs.readFileSync(FILE_PATH2, 'utf-8'));
        }
        const combinedData = [...existingData, ...newArticles];
        fs.writeFileSync(FILE_PATH2, JSON.stringify(combinedData, null, 2));
        log("Files synced")          
    } catch (error) {
        log("There was an error trying to pull from the news api");
        console.error(error);
    }
}



export async function scrapeNewsAPITechTopics() {
    try {
        log('starting to scrape news api Tech...');
        const response = await axios.get<NewsApiResponse>('https://newsapi.org/v2/everything', {
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
        log("Got the responses");
        const newArticles = response.data.articles.map((article: Article) => ({
            title: article.title,
            url: article.url,
            author: article.author,
            publishedAt: article.publishedAt
        }));

        let existingData: Article[] = []
        
        if (fs.existsSync(FILE_PATH2)) {
            existingData = JSON.parse(fs.readFileSync(FILE_PATH2, 'utf-8'));
        }
        const combinedData = [...existingData, ...newArticles];
        fs.writeFileSync(FILE_PATH2, JSON.stringify(combinedData, null, 2));
        log("Files synced")          
    } catch (error) {
        log("There was an error trying to pull from the news api");
        console.error(error);
    }
}

