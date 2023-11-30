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
// Query for finding actors who have played in the most movies:
const j = `SELECT a.ActorId, a.name, COUNT(ea.EntertainmentId) AS movieCount
FROM actor a
JOIN entertainmentActor ea ON a.ActorId = ea.ActorId
GROUP BY a.ActorId, a.name
ORDER BY movieCount DESC
LIMIT 1;`;

// 11
// Query for each entertainment type with the highest average popularity:
const k = `SELECT e.type, a.ActorId, a.actorName, AVG(m.popularity) AS avg_popularity
FROM Actor a
JOIN EntertainmentActor ea ON a.ActorId = ea.ActorId
JOIN Entertainment e ON ea.EntertainmentId = e.EntertainmentId
JOIN movie m ON e.EntertainmentId = m.EntertainmentId
GROUP BY e.type, a.ActorId, a.actorName
ORDER BY avg_popularity DESC;`;

// 12
// Query the number of movies and games each actor has participated in:
const l = `SELECT a.ActorId, a.actorName, COUNT(DISTINCT em.EntertainmentId) AS movieCount, COUNT(DISTINCT g.GameId) AS gameCount
FROM Actor a
LEFT JOIN EntertainmentActor em ON a.ActorId = em.ActorId
LEFT JOIN Entertainment e ON em.EntertainmentId = e.EntertainmentId
LEFT JOIN Game g ON e.EntertainmentId = g.EntertainmentId
GROUP BY a.ActorId, a.actorName
ORDER BY movieCount DESC, gameCount DESC;`;

// 13
// Query for each actor's average age:
const m = `SELECT a.ActorId, a.actorName, AVG(c.age) AS avg_age
FROM Actor a
JOIN EntertainmentActor ea ON a.ActorId = ea.ActorId
JOIN Character c ON ea.EntertainmentId = c.EntertainmentId
GROUP BY a.ActorId, a.actorName
ORDER BY avg_age DESC;`;

// 14
// Query for the average popularity and average rating of each entertainment:
const n = `SELECT e.EntertainmentId, e.name, AVG(e.popularity) AS avg_popularity, AVG(e.rating) AS avg_rating
FROM Entertainment e
GROUP BY e.EntertainmentId, e.name
ORDER BY avg_popularity DESC, avg_rating DESC;`;

// 15
// Query the average popularity of each actor in different types of entertainment:
const o = `SELECT a.ActorId, a.actorName, e.type, AVG(e.popularity) AS avg_popularity
FROM Actor a
JOIN EntertainmentActor ea ON a.ActorId = ea.ActorId
JOIN Entertainment e ON ea.EntertainmentId = e.EntertainmentId
GROUP BY a.ActorId, a.actorName, e.type
ORDER BY avg_popularity DESC;`;

// 16
// Query for the top five actors by average popularity per entertainment:
const p = `SELECT e.EntertainmentId, e.name, a.ActorId, a.actorName, AVG(e.popularity) AS avg_popularity
FROM Actor a
JOIN EntertainmentActor ea ON a.ActorId = ea.ActorId
JOIN Entertainment e ON ea.EntertainmentId = e.EntertainmentId
GROUP BY e.EntertainmentId, e.name, a.ActorId, a.actorName
ORDER BY avg_popularity DESC
LIMIT 5;`;

// 17
// Query the overall popularity and total rating of each actor:
const q = `SELECT a.ActorId, a.actorName, SUM(e.popularity) AS total_popularity, SUM(e.rating) AS total_rating
FROM Actor a
JOIN EntertainmentActor ea ON a.ActorId = ea.ActorId
JOIN Entertainment e ON ea.EntertainmentId = e.EntertainmentId
GROUP BY a.ActorId, a.actorName
ORDER BY total_popularity DESC, total_rating DESC;`;

// 18
// Query the top five actors by average popularity and average rating for each entertainment:
const r = `SELECT e.EntertainmentId, e.name, a.ActorId, a.actorName, AVG(e.popularity) AS avg_popularity, AVG(e.rating) AS avg_rating
FROM Actor a
JOIN EntertainmentActor ea ON a.ActorId = ea.ActorId
JOIN Entertainment e ON ea.EntertainmentId = e.EntertainmentId
GROUP BY e.EntertainmentId, e.name, a.ActorId, a.actorName
ORDER BY avg_popularity DESC, avg_rating DESC
LIMIT 5;`;

// 19
// Query for the number of different types of entertainment an actor has appeared in:
const s = `SELECT a.ActorId, a.actorName, COUNT(DISTINCT e.type) AS entertainment_types
FROM Actor a
JOIN EntertainmentActor ea ON a.ActorId = ea.ActorId
JOIN Entertainment e ON ea.EntertainmentId = e.EntertainmentId
GROUP BY a.ActorId, a.actorName
ORDER BY entertainment_types DESC;`;

// 20
// Query for the average age of each actor in different entertainment genres:
const t = `SELECT a.ActorId, a.actorName, e.type, AVG(c.age) AS avg_age
FROM Actor a
JOIN EntertainmentActor ea ON a.ActorId = ea.ActorId
JOIN Entertainment e ON ea.EntertainmentId = e.EntertainmentId
JOIN Character c ON e.EntertainmentId = c.EntertainmentId
GROUP BY a.ActorId, a.actorName, e.type
ORDER BY avg_age DESC;`;