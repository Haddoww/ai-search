import json
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.manifold import TSNE
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
import umap

tfidf_matrix = np.array(json.load(open("data/raw/tfidf.json"))["tfidf_matrix"])
labels = np.array(json.load(open("data/cluster_assingments.json")))
centroids = np.array(json.load(open("data/cluster_centers.json")))

#covert to 2D
reducer = umap.UMAP(n_components=2, random_state=42)
reduced_data = reducer.fit_transform(tfidf_matrix)

reduced_centroids = reducer.fit_transform(centroids)
# Plot the clusters
plt.figure(figsize=(12, 8))
sns.scatterplot(x=reduced_data[:, 0], y=reduced_data[:, 1], hue=labels, palette="tab20", s=15, alpha=0.7)
plt.scatter(reduced_centroids[:, 0], reduced_centroids[:, 1], marker='X', s=200, c='black', label='Centroids')
plt.title("2D Projection of TF-IDF Vectors with Cluster Labels")
plt.legend()
plt.show()