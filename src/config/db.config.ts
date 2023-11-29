import { createClient } from "@libsql/client/web";
import { vars } from "./vars.config";

export const dbClient = createClient({
  url: vars.db_url as string,
  authToken: vars.db_token as string,
});
// // create entertainment table
// const E = `create table Entertainment (
//   EntertainmentId text primary key,
//   type text,
//   name text,
//   status text,
//   description text,
//   genres text
// );`;

// // actor table - fill out unknown
// const A = `create table Actor (
// ActorId text primary key,
// name text
// );`;

// // character table
// const C = `create table Character (
//   CharacterId text primary key,
//   ActorId,
//   name text,
//   gender text,
//   dob text,
//   age text, 
//   EntertainmentId,
//   physical text,
//   potential text,
//   defense text,
//   intelligence text,
//   magic text,
//   agility text,
//   foreign key (ActorId) references Actor(ActorId),
//   foreign key (EntertainmentId) references Entertainment(EntertainmentId)
// );`;

// popularityTimeline table
// const P = `create table c (
//   CharacterId,
//   date text,
//   popularity number,
//   foreign key (CharacterId) references Character(CharacterId)
// );`;

// //entertainmentActor table - fill out actor reference id
// const EA = `create table EntertainmentActor (
//   EntertainmentActorId primary key,
//   ActorId,
//   EntertainmentId,
//   foreign key (ActorId) references Actor(ActorId),
//   foreign key (EntertainmentId) references Entertainment(EntertainmentId)
// );`;

// // table creation arr
// const tableCreationArr = [E, A, C, P, EA];

// await Promise.all(
//   tableCreationArr.map(async (command) => {
//     await dbClient.execute(command);
//   })
// );

// trigger
// CREATE TRIGGER validate_actor_on_character_insert
// BEFORE INSERT ON Character
// FOR EACH ROW
// BEGIN
//     IF NOT EXISTS (SELECT * FROM Actor WHERE ActorId = NEW.ActorId) THEN
//         SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid ActorId: Actor does not exist.';
//     END IF;
// END;

// CREATE TRIGGER validate_actor_on_character_update
// BEFORE UPDATE ON Character
// FOR EACH ROW
// BEGIN
//     IF NOT EXISTS (SELECT * FROM Actor WHERE ActorId = NEW.ActorId) THEN
//         SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid ActorId: Actor does not exist.';
//     END IF;
// END;