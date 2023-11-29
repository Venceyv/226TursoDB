import path from "path";
import { getRandomInt, readFileData } from "../service/filehandler.service";
import { dbClient } from "../config/db.config";
import crypto from "node:crypto";
import { faker } from "@faker-js/faker";
import fetch from "node-fetch";
import { Character } from "../interface/characters.interface";
import { Media } from "../interface/media.interface";
import { vars } from "../config/vars.config";

export const insertIntoMedia = async () => {
  try {
    const __dirname = path.resolve();
    const media_filePath = path.join(__dirname, `/src/jsonfiles/media.json`);
    const media_data = readFileData(media_filePath);
    await Promise.all(
      (media_data as [any]).map(async (value) => {
        await dbClient.execute({
          sql: "insert into Entertainment values (?,?,?,?,?,?)",
          args: [
            crypto.randomBytes(20).toString("hex"),
            value.type,
            value.name,
            value.status,
            value.description,
            value.genres,
          ],
        });
      })
    );
  } catch (error) {
    console.log(error);
  }
};
export const getDBData = async (dbName: string) => {
  const dbBack = await dbClient.execute(`select * from ${dbName}`);
  return dbBack.rows;
};

export const insertCharacterData = async () => {
  try {
    const __dirname = path.resolve();
    const character_filePath = path.join(__dirname, `/src/jsonfiles/characters.json`);
    const character_data = readFileData(character_filePath);
    await Promise.all(
      (character_data as [any]).map(async (value) => {
        const actorId = await getActorId(value.actor);
        const mediaId = await getMediaId(value.media);
        await dbClient.execute({
          sql: "insert into Character values (?,?,?,?,?,?,?,?,?,?,?,?,?)",
          args: [
            crypto.randomBytes(20).toString("hex"),
            actorId == undefined ? "null" : actorId,
            value.name,
            value.gender,
            value.dob,
            value.age.toString(),
            mediaId == undefined ? "null" : mediaId,
            value.physical,
            value.potential,
            value.defense,
            value.intelligence,
            value.magic,
            value.agility,
          ],
        });
      })
    );
  } catch (error) {
    console.log(error);
  }
};
export const insertActorData = async () => {
  try {
    const __dirname = path.resolve();
    const vc_filePath = path.join(__dirname, `/src/jsonfiles/vc.json`);
    const vc_data = readFileData(vc_filePath);
    await Promise.all(
      (vc_data as [any]).map(async (value) => {
        await dbClient.execute({
          sql: "insert into Actor values (?,?)",
          args: [crypto.randomBytes(20).toString("hex"), value.name],
        });
      })
    );
  } catch (error) {
    console.log(error);
  }
};
export const getActorId = async (ActorName: string) => {
  const actorDataSet = await getDBData("Actor");
  const actorData: any = actorDataSet.find((e) => e.name == ActorName);
  if (actorData == undefined) return undefined;
  return actorData.ActorId;
};

export const getMediaId = async (MediaName: string) => {
  const mediaSet = await getDBData("Entertainment");
  const mediaData: any = mediaSet.find((e) => e.name == MediaName);
  if (mediaData == undefined) return undefined;
  return mediaData.EntertainmentId;
};

export const insertMovieData = async () => {
  try {
    const __dirname = path.resolve();
    const movie_filePath = path.join(__dirname, `/src/jsonfiles/movies.json`);
    const movie_data = readFileData(movie_filePath);
    await Promise.all(
      (movie_data as [any]).map(async (value) => {
        await dbClient.execute({
          sql: "insert into Entertainment values (?,?,?,?,?,?)",
          args: [
            crypto.randomBytes(20).toString("hex"),
            "movie",
            value.title,
            value.status,
            value.description,
            value.genres[0],
          ],
        });
      })
    );
  } catch (error) {
    console.log(error);
  }
};
export const insertMovieActor = async () => {
  try {
    const __dirname = path.resolve();
    const movie_filePath = path.join(__dirname, `/src/jsonfiles/movies.json`);
    const movie_data = readFileData(movie_filePath);
    const characterInfo = (movie_data as [any]).map((e) => e.characterInfo);
    let actors: any[] = [];
    (characterInfo as [any])
      .map((ele) => (ele as [any]).map((e) => e.actor.actorName))
      .map((e) =>
        (e as [any]).map((ele) =>
          actors.push({
            sql: "insert into Actor values (?,?)",
            args: [crypto.randomBytes(20).toString("hex"), ele],
          })
        )
      );
    await dbClient.batch(actors);
  } catch (error) {
    console.log(error);
  }
};
export const fixCharactersData = async () => {
  const __dirname = path.resolve();
  const character_filePath = path.join(__dirname, `/src/jsonfiles/characters.json`);
  const character_data = readFileData(character_filePath);
  await Promise.all(
    (character_data as [any]).map(async (ele) => {
      const physical = getRandomInt(0, 99).toString();
      const potential = getRandomInt(0, 99).toString();
      const defense = getRandomInt(0, 99).toString();
      const intelligence = getRandomInt(0, 99).toString();
      const magic = getRandomInt(0, 99).toString();
      const agility = getRandomInt(0, 99).toString();
      await dbClient.execute({
        sql: "update Character set physical = ?, potential = ?, defense = ?, intelligence = ?,magic = ?,agility = ? where name = ?",
        args: [physical, potential, defense, intelligence, magic, agility, ele.name],
      });
    })
  );
};
export const insertMovieCharacter = async () => {
  const __dirname = path.resolve();
  const movie_filePath = path.join(__dirname, `/src/jsonfiles/movies.json`);
  const movie_data = readFileData(movie_filePath);
  const characterInfo = (movie_data as [any]).map((e) => e.characterInfo);
  const commands: any[] = [];
  const mediaData = await dbClient.execute({
    sql: "select EntertainmentId, name from Entertainment",
    args: [],
  });
  const actorData = await dbClient.execute({
    sql: "select * from Actor",
    args: [],
  });
  (characterInfo as [any])
    .map((ele) => (ele as [any]).map((e) => e.character))
    .map((e) =>
      (e as [any]).map(async (ele) => {
        const physical = getRandomInt(0, 99).toString();
        const potential = getRandomInt(0, 99).toString();
        const defense = getRandomInt(0, 99).toString();
        const intelligence = getRandomInt(0, 99).toString();
        const magic = getRandomInt(0, 99).toString();
        const agility = getRandomInt(0, 99).toString();
        const dob = faker.date.birthdate();
        const gender = ["male", "female", "undefined"];
        const ActorId = actorData.rows.find((e) => e.name == ele.actorName)!.ActorId;
        const EntertainmentId = mediaData.rows.find((e) => e.name == ele.media)!.EntertainmentId;
        commands.push({
          sql: "insert into Character values (?,?,?,?,?,?,?,?,?,?,?,?,?)",
          args: [
            crypto.randomBytes(20).toString("hex"),
            ActorId,
            ele.name,
            gender[getRandomInt(0, 2)],
            dob,
            (new Date().getFullYear() - new Date(dob as Date).getFullYear()).toString(),
            EntertainmentId,
            physical,
            potential,
            defense,
            intelligence,
            magic,
            agility,
          ],
        });
      })
    );
  await dbClient.batch(commands);
};
const insertOneIntoMedia = async (mediaName: string) => {
  try {
    const __dirname = path.resolve();
    const movie_filePath = path.join(__dirname, `/src/jsonfiles/movies.json`);
    const movie_data = readFileData(movie_filePath);
    const value = (movie_data as [any]).find((e) => e.title == mediaName);
    const entertainmentId = crypto.randomBytes(20).toString("hex");
    await dbClient.execute({
      sql: "insert into Entertainment values (?,?,?,?,?,?)",
      args: [entertainmentId, "movie", value.title, value.status, value.description, value.genres[0]],
    });
    return entertainmentId;
  } catch (error) {
    console.log(error);
  }
};
export const getAnimes = async () => {
  const media: Media[] = [];
  const data: any = await fetchCharacters(1, 40);
  (data.data.Page.characters as [any]).map((e) => {
    (e.media.nodes as [any]).map((e) => {
      const mediaData: Media = {
        type: "anime",
        name: e.title.english,
        status: e.status,
        description: e.description,
        genres: e.genres[0],
      };
      media.push(mediaData);
    });
  });
  return media;
};

export const getAnimeCharacters = async () => {
  const characters: Character[] = [];
  const data: any = await fetchCharacters(1, 40);
  const media = await dbClient.execute({
    sql: "select EntertainmentId, name from Entertainment",
    args: [],
  });
  const actorId = await getActorId("unknow");
  (data.data.Page.characters as [any]).map((e) => {
    const dob = faker.date.birthdate();
    const physical = getRandomInt(0, 99).toString();
    const potential = getRandomInt(0, 99).toString();
    const defense = getRandomInt(0, 99).toString();
    const intelligence = getRandomInt(0, 99).toString();
    const magic = getRandomInt(0, 99).toString();
    const agility = getRandomInt(0, 99).toString();
    const character: Character = {
      actor: actorId,
      name: e.name.full,
      gender: e.gender,
      dob: dob,
      age: e.age,
      media: media.rows.find((ele) => ele.name == e.media.nodes[0].title.english)!.EntertainmentId as string,
      physical: physical,
      potential: potential,
      defense: defense,
      intelligence: intelligence,
      magic: magic,
      agility: agility,
    };
    characters.push(character);
  });

  return characters;
};
//  const animes = await getAnimes();
export const insertAnimeData = async (anime: any) => {
  await dbClient.execute({
    sql: "insert into Entertainment values (?,?,?,?,?,?)",
    args: [
      crypto.randomBytes(20).toString("hex"),
      anime.type,
      anime.name,
      anime.status,
      anime.description,
      anime.genres,
    ],
  });
};
async function fetchCharacters(page: number, perPage: number) {
  const query = `
    {
        Page(page: ${page}, perPage: ${perPage}) {
            characters {
                id,
                name {
                    first,
                    middle,
                    last,
                    full,
                    alternative,
                },
                image {
                    medium
                },
                description,
                gender,
                dateOfBirth {
                    year
                    month
                    day
                },
                age,
                media {
                    nodes {
                        title {
                            romaji
                            english
                            native
                            userPreferred
                        },
                        type,
                        status,
                        description,
                        genres,
                        popularity
                    }
                }
            }
        }
    }`;
  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export const removeDuplicateMedia = async () => {
  const mediaName: any = [];
  const media = await dbClient.execute({
    sql: "select EntertainmentId, name from Entertainment",
    args: [],
  });
  const command: any = [];
  media.rows.map((e) => {
    const DuplicateData = (mediaName as [any]).find((ele) => ele == e.name);
    if (DuplicateData != undefined) {
      command.push({
        sql: "delete from Entertainment where EntertainmentId = ?",
        args: [e.EntertainmentId],
      });
    } else mediaName.push(e.name);
  });
  await dbClient.batch(command);
};

export const insertAnimeCharacter = async () => {
  const characters = await getAnimeCharacters();
  const commands: any = [];
  characters.map((ele) => {
    commands.push({
      sql: "insert into Character values (?,?,?,?,?,?,?,?,?,?,?,?,?)",
      args: [
        crypto.randomBytes(20).toString("hex"),
        ele.actor,
        ele.name,
        ele.gender,
        ele.dob,
        ele.age,
        ele.media,
        ele.physical,
        ele.potential,
        ele.defense,
        ele.intelligence,
        ele.magic,
        ele.agility,
      ],
    });
  });
  await dbClient.batch(commands);
};

export const insertIntoEntertainmentActor = async () => {
  const characters = await getDBData("Character");
  const commands: any[] = [];
  characters.map((ele) => {
    commands.push({
      sql: "insert into EntertainmentActor values (?,?,?)",
      args: [crypto.randomBytes(20).toString("hex"), ele.ActorId, ele.EntertainmentId],
    });
  });
  await dbClient.batch(commands);
};

export const insertIntoPopularityTimeline = async (id: string, data: any[]) => {
  const commands: any[] = [];
  data.map((e) => {
    commands.push({
      sql: "insert into PopularityTimeline values (?,?,?)",
      args: [id, e.date, e.value],
    });
  });
  await dbClient.batch(commands);
};
export const getCharactorIdByName = async (name: string) => {
  const characters = await getDBData("Character");
  const character = characters.find((e) => (e.name as string).split("-")[0] == name);
  if (character != undefined) return character.CharacterId;
  return character;
};
export const getPopularity = async (cookie: string, name: string) => {
  const response = await fetch(
    `${vars.baidu_url}?` +
      new URLSearchParams({
        cookies: cookie,
        keyword: name,
        start_date: "2023-01-01",
        end_date: "2023-11-1",
        index_name: "feedsearch",
      }),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};
const delay = (delayInms: number) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};
export const insertLolCharactorPopularityTimeLine = async (cookie: string) => {
  const __dirname = path.resolve();
  const genshin_filePath = path.join(__dirname, `/src/jsonfiles/lol_char_en_ch.json`);
  const characters = readFileData(genshin_filePath);
  let counter = 0;
  for (const character of characters) {
    const commands: any[] = [];
    const characterId = await getCharactorIdByName(character.english);
    await delay(12000);
    const popularity = await getPopularity(cookie, character.chinese);
    console.log(popularity);
    (popularity as any[]).map((e) => {
      commands.push({
        sql: "insert into PopularityTimeline values (?,?,?)",
        args: [characterId, e.date, e.value],
      });
    });
    await dbClient.batch(commands);
    console.log(`finish ${counter}`);
    counter += 1;
  }
};

export const insertIntoPopularityTimelineByKeyWord = async (
  cookie: string,
  keyword: string,
  characterName: string
) => {
  const popularity = await getPopularity(cookie, keyword);
  const characterId = await getCharactorIdByName(characterName);
  const commands: any[] = [];
  (popularity as any[]).map((e) => {
    commands.push({
      sql: "insert into PopularityTimeline values (?,?,?)",
      args: [characterId, e.date, e.value],
    });
  });
  await dbClient.batch(commands);
  const res = await dbClient.execute({
    sql: "select * from popularityTimeline where CharacterId = ?",
    args: [characterId as string],
  });
  return res.rows;
};
