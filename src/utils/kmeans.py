import json
import numpy as np
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

with open("data/raw/tfidf.json", "r") as file:
    tfidf_data = json.load(file)

vocabulary = tfidf_data["vocabulary"]
tfidf_matrix = np.array(tfidf_data["tfidf_matrix"])

print(f"Loaded TF-IDF matrix with shape: {tfidf_matrix.shape}")

#run kmeans
k = 6
kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
kmeans.fit(tfidf_matrix)

print(f"Cluster centers: {kmeans.cluster_centers_.shape}")
print(f"Labels: {kmeans.labels_.shape}")

with open("data/cluster_assingments.json", "w") as file:
    json.dump(kmeans.labels_.tolist(), file)
    
with open("data/cluster_centers.json", "w") as file:
    json.dump(kmeans.cluster_centers_.tolist(), file)



#Plot
plt.plot(range(1, 11), [KMeans(n_clusters=i, random_state=42, n_init=10).fit(tfidf_matrix).inertia_ for i in range(1, 11)])
plt.xlabel("Number of Clusters (k)")
plt.ylabel("Inertia")
plt.title("Elbow Method for Optimal k")
plt.show()