#!/usr/bin/env python3
"""Script to examine the data files."""

import pandas as pd
import os

def examine_data():
    data_dir = "data"
    
    files = ["train.csv", "test.csv", "movies.csv", "sample.csv"]
    
    for file in files:
        filepath = os.path.join(data_dir, file)
        if os.path.exists(filepath):
            print(f"\n=== {file} ===")
            try:
                # Read first few rows
                df = pd.read_csv(filepath, nrows=5)
                print(f"Columns: {list(df.columns)}")
                print(f"Shape (first 5 rows): {df.shape}")
                print("Sample data:")
                print(df.head())
            except Exception as e:
                print(f"Error reading {file}: {e}")
        else:
            print(f"{file} not found")

if __name__ == "__main__":
    examine_data() 