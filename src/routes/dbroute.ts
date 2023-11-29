import { Router } from "express";
import {
  getDataByQuery,
  getTopPopularCharacter,
  postAnimeToDb,
  postCharacterToDb,
  postToTimelinePopularityByKeyword,
} from "../controller/db.controller";

export const dbRouter = Router();

dbRouter.get("/", getDataByQuery);
dbRouter.get("/popularity", getTopPopularCharacter);
dbRouter.post("/", postToTimelinePopularityByKeyword);
dbRouter.post("/character", postCharacterToDb);
dbRouter.post("/anime", postAnimeToDb);
