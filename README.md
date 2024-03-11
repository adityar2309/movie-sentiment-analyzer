# Sentiment Prediction on Movie Reviews

This project aims to predict the sentiment of movie reviews using machine learning techniques. The dataset used in this project is sourced from Kaggle and contains movie reviews along with associated metadata such as audience scores, movie titles, genres, and reviewer information.

## Getting Started

To run this project, you can use the provided Jupyter Notebook in Google Colab. Before executing the notebook, ensure you have the necessary dependencies installed. Additionally, the notebook automatically downloads and imports the required dataset from Kaggle. However, please note that this notebook environment differs from Kaggle's Python environment, so there may be missing libraries used by the notebook.

## Dataset

The dataset used in this project consists of three main files:

1. `train.csv`: Contains training data for sentiment prediction.
2. `test.csv`: Contains test data for sentiment prediction.
3. `movies.csv`: Contains metadata about the movies, including audience scores, titles, genres, etc.

## Preprocessing

The preprocessing steps include handling missing values, removing duplicate movie entries, and splitting the data into features and target variables. Categorical features are imputed using the most frequent value, and numeric features are imputed using the mean value. Textual features are transformed using TF-IDF vectorization.

## Model Training

Three machine learning models are trained on the preprocessed data:

1. Logistic Regression
2. Support Vector Classifier (SVC)
3. Stochastic Gradient Descent (SGD)

Hyperparameter tuning is performed using RandomizedSearchCV to find the best combination of hyperparameters for each model.

## Model Evaluation

The trained models are evaluated on the training data using accuracy score. The best hyperparameters for each model are extracted and printed for better understanding and reproducibility.

## Prediction and Submission

Finally, the trained models are used to predict sentiment labels on the test data. The predictions are saved to a CSV file named `submission.csv`, which can be submitted to Kaggle for evaluation.

## Conclusion

This project demonstrates the application of machine learning techniques for sentiment prediction on movie reviews. By leveraging preprocessing techniques, hyperparameter tuning, and model evaluation, we aim to build accurate models capable of predicting sentiment labels effectively.
