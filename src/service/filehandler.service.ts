import * as fs from "node:fs";

const writeToFile = (filePath: string, content: string) => {
  try {
    fs.writeFile(filePath, content, function (err) {
      if (err) throw err;
    });
  } catch (error) {
    console.log(error);
  }
};

const readFileData = (filePath: string) => {
  try {
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const videoInfo = fs.readFileSync(filePath, "utf-8");
    let videoInfoJson = [];
    if (videoInfo.length != 0) {
      videoInfoJson = JSON.parse(videoInfo);
    }
    return videoInfoJson;
  } catch (error) {
    console.log(error);
  }
};

const readFolerData = (folderPath: string) => {
  try {
    if (!fs.existsSync(folderPath)) {
      return [];
    }
    const folderName: string[] = fs
      .readdirSync(folderPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
    return folderName;
  } catch (error) {
    console.log(error);
  }
};

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export { writeToFile, readFileData, readFolerData, getRandomInt };
