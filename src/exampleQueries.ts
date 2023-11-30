// 1
// Query for all entertain basic information:
const a = `SELECT EntertainmentId, type, name, status, description, genres
FROM Entertainment;`;

// 2
// Query for specific type of entertainment
const b = `SELECT EntertainmentId, type, name, status, description, genres
FROM Entertainment
WHERE type = 'your_type';`;

// 3
// Query for entertainment popularity by descending
const c = `SELECT EntertainmentId, name, status, description, genres
FROM Entertainment
ORDER BY popularity DESC;`;

// 4
// Query for rating by descending
const d = `SELECT EntertainmentId, name, status, description, genres
FROM Entertainment
ORDER BY popularity ASC;`;

// 5
// Query for specific actor’s entertainment
const e = `SELECT e.EntertainmentId, e.name, e.status, e.description, e.genres
FROM Entertainment e
JOIN EntertainmentActor ea ON m.EntertainmentId = ea.EntertainmentId
WHERE ea.ActorId = 'your_actor_id';`;

// 6
// Query entertainment for a timeline
const f = `SELECT EntertainmentId, name, status, description, genres
FROM Entertainment
WHERE releaseDate BETWEEN 'start_date' AND 'end_date';`;

// 7
// Query for average popularity rating
const g = `SELECT type, AVG(movie.popularity) as avg.popularity
FROM Entertainment
GROUP BY type_id
ORDER BY avg_popularity DESC;`;

// 8
// Query for most popular entertainment at each type
const h = `SELECT type, MAX(popularity) AS max_popularity
FROM Entertainment
GROUP BY type;`;

// 9
// Query for recent released entertainment
const i = `SELECT EntertainmentId, name, status, description, genres
FROM Entertainment
ORDER BY releaseDate DESC
LIMIT 10;`;

// 10
// List of Actors and the Number of Characters They've Played:
const j = `SELECT 
Actor.name AS ActorName, 
COUNT(Character.ActorId) AS NumberOfCharacters
FROM 
Actor
JOIN 
Character ON Actor.ActorId = Character.ActorId
GROUP BY 
Actor.name;
`;

// 11
// Most Popular Characters Based on PopularityTimeline:
const k = `SELECT 
Character.name, 
MAX(PopularityTimeline.popularity) AS MaxPopularity
FROM 
Character
JOIN 
PopularityTimeline ON Character.CharacterId = PopularityTimeline.CharacterId
GROUP BY 
Character.name
ORDER BY 
MaxPopularity DESC;
`;

// 12
// Characters and Their Associated Entertainment:
const l = `SELECT 
Character.name AS CharacterName, 
Entertainment.name AS EntertainmentTitle
FROM 
Character
JOIN 
Entertainment ON Character.EntertainmentId = Entertainment.EntertainmentId;
`;

// 13
//Actors and the Entertainment Titles They've Worked In:
const m = `SELECT 
Actor.name AS ActorName, 
Entertainment.name AS EntertainmentTitle
FROM 
EntertainmentActor
JOIN 
Actor ON EntertainmentActor.ActorId = Actor.ActorId
JOIN 
Entertainment ON EntertainmentActor.EntertainmentId = Entertainment.EntertainmentId;
`;

// 14
// Average Popularity of Characters in Each Entertainment Title:
const n = `SELECT 
Entertainment.name AS EntertainmentTitle, 
AVG(PopularityTimeline.popularity) AS AveragePopularity
FROM 
Entertainment
JOIN 
Character ON Entertainment.EntertainmentId = Character.EntertainmentId
JOIN 
PopularityTimeline ON Character.CharacterId = PopularityTimeline.CharacterId
GROUP BY 
Entertainment.name;
`;

// 15
// Entertainment Titles and Their Total Number of Characters:
const o = `SELECT 
Entertainment.name AS EntertainmentTitle, 
COUNT(Character.EntertainmentId) AS NumberOfCharacters
FROM 
Entertainment
JOIN 
Character ON Entertainment.EntertainmentId = Character.EntertainmentId
GROUP BY 
Entertainment.name;
;`;

// 16
// Actors and Their Latest Featured Entertainment Title:
const p = `SELECT 
Actor.name AS ActorName, 
MAX(Entertainment.name) AS LatestEntertainment
FROM 
Actor
JOIN 
EntertainmentActor ON Actor.ActorId = EntertainmentActor.ActorId
JOIN 
Entertainment ON EntertainmentActor.EntertainmentId = Entertainment.EntertainmentId
GROUP BY 
Actor.name;`;

// 17
// Characters with the Highest Popularity in Each Genre:
const q = `SELECT 
Entertainment.genres AS Genre, 
Character.name AS CharacterName, 
MAX(PopularityTimeline.popularity) AS MaxPopularity
FROM 
Character
JOIN 
Entertainment ON Character.EntertainmentId = Entertainment.EntertainmentId
JOIN 
PopularityTimeline ON Character.CharacterId = PopularityTimeline.CharacterId
GROUP BY 
Entertainment.genres;
`;

// 18
// Actors Who Have Played More Than One Character:
const r = `SELECT 
Actor.name 
FROM 
Actor
JOIN 
Character ON Actor.ActorId = Character.ActorId
GROUP BY 
Actor.name
HAVING 
COUNT(Character.ActorId) > 1;
`;

// 19
// Actors and the Range of Character Ages They've Portrayed:
const s = `SELECT 
Actor.name AS ActorName, 
MIN(Character.age) AS YoungestAge, 
MAX(Character.age) AS OldestAge
FROM 
Actor
JOIN 
Character ON Actor.ActorId = Character.ActorId
GROUP BY 
Actor.name;
`;

// 20
// Characters and Their Corresponding Actors in a Specific Entertainment Type:
const t = `SSELECT 
Character.name AS CharacterName, 
Actor.name AS ActorName, 
Entertainment.type AS EntertainmentType
FROM 
Character
JOIN 
Actor ON Character.ActorId = Actor.ActorId
JOIN 
Entertainment ON Character.EntertainmentId = Entertainment.EntertainmentId
WHERE 
Entertainment.type = 'movie';`;
