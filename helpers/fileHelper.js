import { readFileSync, writeFileSync } from "fs";

//Function used to automatically find the latest ID in a dataset, and return the dataset with an incremented id
export function incrementId(defaultData, reqBody) {
  const lastId = defaultData[defaultData.length - 1]["id"];
  reqBody.id = lastId + 1;

  return reqBody;
}

//Generic Helper Function used to write new data to any of the default data sets, with automatic incrementation
export function writeToDataFile(dataPath, reqBody) {
  const defaultData = readFileSync(dataPath, "utf-8");
  const defaultDataJson = JSON.parse(defaultData);

  const newData = incrementId(defaultDataJson, reqBody);
  defaultDataJson.push(newData);

  writeFileSync(dataPath, JSON.stringify(defaultDataJson, null, 2), "utf-8");
}
