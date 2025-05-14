import sys
import json
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

with open("data/raw/tfidf.json", "r") as file:
    tfidf_data = json.load(file)

vocabulary = tfidf_data["vocabulary"]
idf_values = np.array(tfidf_data["idf"])

vectorizer = TfidfVectorizer(vocabulary=vocabulary)
vectorizer.idf_ = idf_values


query = " ".join(sys.argv[1:])

query_vector = vectorizer.transform([query]).toarray().tolist()[0]
print(json.dumps(query_vector))