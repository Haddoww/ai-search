# 🔍 Startup AI Search Engine

An intelligent, ML-powered search engine that leverages TF-IDF vectorization and K-Means clustering to classify, rank, and retrieve startup and tech news articles in real-time.

![TypeScript](https://img.shields.io/badge/TypeScript-4.0+-blue.svg)
![Python](https://img.shields.io/badge/Python-3.8+-green.svg)
![scikit-learn](https://img.shields.io/badge/scikit--learn-ML-orange.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 📋 Overview

This project implements a **machine learning-powered search engine** specifically designed for startup and technology news. By combining advanced natural language processing techniques with efficient clustering algorithms, it provides semantically relevant search results ranked by content similarity rather than simple keyword matching.

**Project Timeline:** May 2025

## ✨ Key Features

### 🤖 Machine Learning Pipeline
- **TF-IDF Vectorization**: Transforms text into numerical feature vectors capturing document importance
- **K-Means Clustering**: Automatically groups similar articles into semantic categories
- **Intelligent Ranking**: Scores and ranks results based on query relevance
- **Scalable Architecture**: Handles thousands of articles with sub-second query response

### 🔄 Multi-Stage NLP Pipeline
1. **Data Ingestion**: Aggregates articles from HackerNews and NewsAPI
2. **Text Preprocessing**: Tokenization, stopword removal, lemmatization
3. **Feature Extraction**: TF-IDF vectorization for document representation
4. **Clustering**: K-Means grouping for semantic organization
5. **Query Processing**: Real-time vectorized document retrieval
6. **Result Ranking**: Cosine similarity-based relevance scoring

### 📰 Data Sources
- **HackerNews API**: Tech startup stories, discussions, and trends
- **NewsAPI**: Broader technology and business news coverage
- Automatic data refresh and incremental indexing

### ⚡ Real-Time Performance
- Vectorized operations for fast query execution
- Optimized document retrieval using scipy sparse matrices
- Cached clustering results for instant classification
- Sub-second response times for typical queries



