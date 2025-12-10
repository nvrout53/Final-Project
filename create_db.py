import pandas as pd
import sqlite3

# Read the CSV file
df = pd.read_csv('2023_NBA_draft.csv')

# Create a SQLite database connection
conn = sqlite3.connect('2023_NBA_draft.db')

# Write the dataframe to the database as a table
df.to_sql('nba_draft_2023', conn, if_exists='replace', index=False)

# Close the connection
conn.close()

print("SQLite database created successfully!")
print(f"Table 'nba_draft_2023' with {len(df)} records")
