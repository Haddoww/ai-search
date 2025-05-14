import json
import os
from sklearn.feature_extraction.text import TfidfVectorizer



DATA_DIR = os.getenv("DATA_DIR", "./data/raw")
INPUT_FILE_STORIES = os.path.join(DATA_DIR, "hackernews-cleaned.json")
INPUT_FILE_ARTICLES = os.path.join(DATA_DIR, "newsapi-cleaned.json")
OUTPUT_FILE = os.path.join(DATA_DIR, "tfidf.json")
OUTPUT_FILE_TEST = os.path.join(DATA_DIR, "test.json")

def main():

    with open(INPUT_FILE_STORIES, "r") as f:
        stories = json.load(f)
    with open(INPUT_FILE_ARTICLES, "r") as f:
        articles = json.load(f)
        

    storyTitles = [story["title"] for story in stories]
    articlesTitles = [article["title"] for article in articles]

    titles = storyTitles + articlesTitles

    test = stories + articles

    vectorizer = TfidfVectorizer(max_df=0.8, min_df=2, stop_words="english")
    tfidf_matrix = vectorizer.fit_transform(titles)



    tfidf_data = {
        "vocabulary": vectorizer.get_feature_names_out().tolist(),
        "tfidf_matrix": tfidf_matrix.toarray().tolist()
    }

    with open(OUTPUT_FILE, "w") as f:
        json.dump(tfidf_data, f, indent=2)
        print(f"TF-IDF data saved to {OUTPUT_FILE}")


    with open(OUTPUT_FILE_TEST, "w") as f:
        json.dump(test, f, indent=2)
        print(f"TF-IDF data saved to {OUTPUT_FILE_TEST}")

if __name__ == "__main__":
    main()
