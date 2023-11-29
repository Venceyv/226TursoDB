import path from "path";
import { getRandomInt, readFileData, writeToFile } from "../service/filehandler.service";
import { faker } from "@faker-js/faker";
import { Character } from "../interface/characters.interface";
import { getActorId, getMediaId } from "../script/db.script";

export const createVcData = () => {
  try {
    const __dirname = path.resolve();
    const genshin_filePath = path.join(__dirname, `/src/jsonfiles/Voice Actor _ Genshin Impact.json`);
    const starRail_filePath = path.join(__dirname, `/src/jsonfiles/Voice Actor _ Star Rail.json`);
    const lol_filePath = path.join(__dirname, `/src/jsonfiles/lol_vc.json`);
    const vc_filePath = path.join(__dirname, `/src/jsonfiles/vc.json`);
    const genshin_data = readFileData(genshin_filePath);
    const starRail_data = readFileData(starRail_filePath);
    const lol_data = readFileData(lol_filePath);
    let vc: any[] = [];
    (genshin_data as [any]).map((value) => vc.push({ name: value.English }));
    (starRail_data as [any]).map((value) => vc.push({ name: value.English }));
    (lol_data as [any]).map((value) => vc.push({ name: value.English }));
    vc = vc.filter(function (item, pos) {
      return vc.indexOf(item) == pos;
    });
    writeToFile(vc_filePath, JSON.stringify(vc));
  } catch (error) {
    console.log(error);
  }
};

export const createCharacters = () => {
  try {
    const __dirname = path.resolve();
    const genshin_filePath = path.join(__dirname, `/src/jsonfiles/Voice Actor _ Genshin Impact.json`);
    const starRail_filePath = path.join(__dirname, `/src/jsonfiles/Voice Actor _ Star Rail.json`);
    const lol_filePath = path.join(__dirname, `/src/jsonfiles/leagueoflegends.json`);
    const vc_filePath = path.join(__dirname, `/src/jsonfiles/characters.json`);
    const genshin_data = readFileData(genshin_filePath);
    const starRail_data = readFileData(starRail_filePath);
    const lol_data = readFileData(lol_filePath);
    let vc: Character[] = [];
    (genshin_data as [any]).map(async (value) => {
      const character = await makeCharacter(value.Name, value.English, "Genshin Impact");
      vc.push(character);
    });
    (starRail_data as [any]).map(async (value) => {
      const character = await makeCharacter(value.Name, value.English, "Honkai: Star Rail");
      vc.push(character);
    });
    (lol_data as [any]).map(async (value) => {
      const character = await makeCharacter(value.Name, value.English, "League of Legends");
      vc.push(character);
    });
    vc = vc.filter(function (item, pos) {
      return vc.indexOf(item) == pos;
    });
    writeToFile(vc_filePath, JSON.stringify(vc));
  } catch (error) {
    console.log(error);
  }
};

export const a = () => {
  const __dirname = path.resolve();
  const lol_filePath = path.join(__dirname, `/src/jsonfiles/leagueoflegends.json`);
  const lolvc_filePath = path.join(__dirname, `/src/jsonfiles/lol_vc.json`);
  const lol_data = readFileData(lol_filePath);
  const lolvc_data = readFileData(lolvc_filePath);
  (lol_data as [any]).forEach((value, index, array) => {
    const cv = (lolvc_data as [any]).find((ele) => ele.Name == value.Name.split("-")[0].toUpperCase());
    array[index] = {
      Name: value.Name,
      English: cv == undefined ? "unknow" : cv.English,
    };
  });
  writeToFile(lol_filePath, JSON.stringify(lol_data));
};

export const makeCharacter = async (name: string, actorName: string, media: string) => {
  const dob = faker.date.birthdate();
  const gender = ["male", "female", "undefined"];
  const physical = getRandomInt(0, 99).toString();
  const potential = getRandomInt(0, 99).toString();
  const defense = getRandomInt(0, 99).toString();
  const intelligence = getRandomInt(0, 99).toString();
  const magic = getRandomInt(0, 99).toString();
  const agility = getRandomInt(0, 99).toString();
  const [mediaId, actorId] = await Promise.all([getMediaId(media), getActorId("unknow")]);
  const character: Character = {
    actor: actorId,
    name: name,
    gender: gender[getRandomInt(0, 2)],
    dob: dob,
    age: new Date().getFullYear() - new Date(dob as Date).getFullYear(),
    media: mediaId,
    physical: physical,
    potential: potential,
    defense: defense,
    intelligence: intelligence,
    magic: magic,
    agility: agility,
  };
  return character;
};
