import { createClient } from '@libsql/client';

// create entertainment table
const E = `create table Entertainment (
    id text primary key,
    type text,
    name text,
    status text,
    description text,
    genres text
);`;

// actor table - fill out unknown
const A = `create table Actor (
);`;

// character table
const C = `create table Character (
    id text,
    actor text,
    media text,
    name text,
    gender text,
    dob text,
    age text, 
    physical text,
    potential text,
    defense text,
    intelligence text,
    magic text,
    agility text,
);`;

//popularityTimeline table
const P = `create table PopularityTimeline (
    id primary key,
    date text,
    index number
);`;

//entertainmentActor table - fill out actor reference id
const EA = `create table EntertainmentActor (
    id primary key,
    actor_id text,
    media_id text,
    foreign key (actor_id) references Actor(),
    foreign key (media_id) references Entertainment(id) 
);`;

// table creation arr
const tableCreationArr = [E, A, C, P, EA];

// init turso client
const client = createClient({
  url: process.env.TURSO_URL ?? 'libsql://your-database.turso.io',
  authToken: process.env.TURSO_TOKEN ?? 'your-auth-token',
});

// table creation query
for (const key in tableCreationArr) {
  try {
    const rs = await client.execute({
      sql: key,
      args: [],
    });
  } catch (e) {
    console.error(e);
  }
}
// example insert statement -> separated by ? args
try {
  const rs = await client.execute({
    sql: 'insert into Entertainment values (?,?,?,?,?,?);',
    args: [], // <-- fill value here in order
  });
} catch (e) {
  console.error(e);
}
