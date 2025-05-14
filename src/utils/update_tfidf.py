import json
import numpy as np

with open("data/raw/tfidf.json", "r") as file:
    tfidf_data = json.load(file)

vocabulary = tfidf_data["vocabulary"]
tfidf_matrix = np.array(tfidf_data["tfidf_matrix"])

#get idf values
doc_count = tfidf_matrix.shape[0]
term_count = np.count_nonzero(tfidf_matrix, axis= 0)
idf_values = np.log((doc_count + 1) / (term_count + 1)) + 1

tfidf_data["idf"] = idf_values.tolist()

with open("data/raw/tfidf.json", "w") as file:
    json.dump(tfidf_data, file)

print("Updated tfidf.son with idf values")


# vectorizer = TfidfVectorizer(vocabulary=vocabulary)
# vectorizer._tfidf._idf_diag = np.diag(idf_values)


# query = sys.argv[1]
# query_vector = vectorizer.transform([query]).toarray.tolist()[0]
# print(json.dump(query_vector))