  SELECT Nationality, COUNT(*) as count 
    FROM nba_draft_2023 
    GROUP BY Nationality 
    ORDER BY count DESC

SELECT Player, Nationality, Team, "School / club team", Pick, Rnd.
FROM nba_draft_2023
WHERE Nationality IS NOT NULL AND TRIM(Nationality) <> 'United States'
ORDER BY Nationality, Pick;
SELECT Player, Nationality, Team, "School / club team", Pick, "Rnd."
FROM nba_draft_2023
WHERE Nationality IS NOT NULL
  AND TRIM(Nationality) <> 'United States'
ORDER BY Nationality, Pick;
