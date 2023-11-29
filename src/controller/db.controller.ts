import { Request, Response } from "express";
import { dbClient } from "../config/db.config";
import fetch from "node-fetch";
import { vars } from "../config/vars.config";
import { insertIntoPopularityTimelineByKeyWord } from "../script/db.script";
import crypto from "node:crypto";
import { makeCharacter } from "./game.controller";

export const getDataByQuery = async (req: Request, res: Response) => {
  try {
    const sql = req.query.sql as string;
    const args = req.query.args ? (req.query.args as string).split(",") : [];

    const data = await dbClient.execute({
      sql: sql,
      args: args,
    });
    res.status(200).json(data.rows);
  } catch (error) {
    console.log(error);
  }
};

export const getTopPopularCharacter = async (req: Request, res: Response) => {
  try {
    const top = req.query.top;
    const response = await fetch(
      `${vars.serverURL}/db?` +
        new URLSearchParams({
          sql: "select A.name, B.date, B.popularity from Character as A, PopularityTimeline as B where A.CharacterId = B.CharacterId ",
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    const popularityByName: any[] = [];
    let popularityByRank: any[] = [];
    let nameList: any[] = [];
    let topCharacters: any[] = [];
    let filterData: any[] = [];
    let filterDataByDate: any[] = [];
    (data as [any]).map((e) => nameList.push(e.name));
    nameList = nameList.filter(function (item, pos) {
      return nameList.indexOf(item) == pos;
    });
    nameList.map((e) => {
      popularityByName.push((data as [any]).filter((ele) => ele.name == e));
    });
    popularityByName.map((e) => {
      popularityByRank.push({
        name: e[0].name,
        popularity: (e as [any]).reduce((sum, ele) => sum + ele.popularity, 0),
      });
    });
    const date: any[] = [];
    popularityByRank = popularityByRank.sort((a, b) => b.popularity - a.popularity);
    topCharacters = popularityByRank.slice(0, parseInt(top as string));
    topCharacters.map((e) => {
      (data as [any]).filter((ele) => ele.name == e.name).map((e) => filterData.push(e));
    });
    filterData.map((e) => {
      if (!(date as [any]).includes(e.date)) {
        filterDataByDate.push(filterData.filter((ele) => ele.date == e.date));
        date.push(e.date);
      }
    });
    filterDataByDate.forEach((value, index, array) => {
      array[index] = (value as [any]).sort((a, b) => b.popularity - a.popularity);
    });
    const returnData: any[] = [];
    filterDataByDate.map((e) => {
      (e as [any]).forEach((value, index, array) => {
        returnData.push({
          name: value.name.split("-")[0],
          value: value.popularity,
          month: (value.date as string).split("-")[1],
          rank: index + 1,
          day: (value.date as string).split("-")[2],
        });
      });
    });
    res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
  }
};

export const postToTimelinePopularityByKeyword = async (req: Request, res: Response) => {
  try {
    const keyword = req.query.keyword as string;
    const characterName = req.query.characterName as string;
    const cookie = req.query.cookie as string;
    const dbBack = await insertIntoPopularityTimelineByKeyWord(cookie, keyword, characterName);
    res.status(200).json(dbBack);
  } catch (error) {
    console.log(error);
  }
};

export const postCharacterToDb = async (req: Request, res: Response) => {
  try {
    const characterName = req.query.characterName as string;
    const mediaName = req.query.mediaName as string;
    const character = await makeCharacter(characterName, "unknow", mediaName);
    console.log(character);
    await dbClient.execute({
      sql: "insert into Character values (?,?,?,?,?,?,?,?,?,?,?,?,?)",
      args: [
        crypto.randomBytes(20).toString("hex"),
        character.actor,
        character.name,
        character.gender,
        character.dob,
        character.age.toString(),
        character.media,
        character.physical,
        character.potential,
        character.defense,
        character.intelligence,
        character.magic,
        character.agility,
      ],
    });
    res.status(200).json(character);
  } catch (error) {
    console.log(error);
  }
};
//   EntertainmentId text primary key,
//   type text,
//   name text,
//   status text,
//   description text,
//   genres text
export const postAnimeToDb = async (req: Request, res: Response) => {
  try {
    const type = req.query.type as string;
    const name = req.query.name as string;
    const status = req.query.status as string;
    const description = req.query.description as string;
    const genres = req.query.genres as string;
    const animeId = crypto.randomBytes(20).toString("hex");
    await dbClient.execute({
      sql: "insert into Entertainment values (?,?,?,?,?,?)",
      args: [animeId, type, name, status, description, genres],
    });
    res.status(200).json(animeId);
  } catch (error) {
    console.log(error);
  }
};
