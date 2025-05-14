import { log } from '../utils/logger'
import fs from 'fs';
import path from 'path';
import axios from 'axios';

const DATA_DIR = path.join(__dirname, '../../data/raw');
const FILE_PATH = path.join(DATA_DIR, 'hackernews-batch.json');
const OUT_PATH = path.join(DATA_DIR, 'hackernews-cleaned.json');
const HN_API_BASE = 'https://hacker-news.firebaseio.com/v0';


export interface Story {
    title: string;
    url: string;
    by: string;
    time: string;
}
// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}


export async function scrapeHackerNews() {
    try {
        log('starting to scrape hacker news...');

        //Get the top story IDs
        const storyIds = (await axios.get<100[]>(`${HN_API_BASE}/topstories.json`)).data.slice(0, 100);

        //Get the details from each id
        const stories = await Promise.all (
            storyIds.map(async(id) => {
                const story = (await axios.get<Story>(`${HN_API_BASE}/item/${id}.json`)).data;
                return {
                    title: story.title,
                    url: story.url,
                    by: story.by,
                    time: new Date(Number(story.time) * 1000).toISOString(),
                    //text: story.text,
                };
            })
        );
        
        if (fs.existsSync(FILE_PATH)) {
            const existingData = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
            const combinedData = [...existingData, ...stories];
            fs.writeFileSync(FILE_PATH, JSON.stringify(combinedData, null, 2));
        } else {
            fs.writeFileSync(FILE_PATH, JSON.stringify(stories, null, 2));
        }

       log(`Batch data saved to ${FILE_PATH}`);

    } catch (error) {
        log(`Error scraping Hacker News:  ${error}`);
    }
}