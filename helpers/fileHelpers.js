import { readFileSync, writeFileSync } from "fs";

//Generic function used to get data from a specified data object
export function getData(path) {
  const data = readFileSync(path, "utf-8");
  return JSON.parse(data);
}

//Generic Helper Function used to automatically find the latest ID in a dataset, and return the dataset with an incremented id
export function incrementId(defaultData, reqBody) {
  const lastId = defaultData[defaultData.length - 1]["id"];
  reqBody.id = lastId + 1;

  return reqBody;
}

//Generic Helper Function used to write/push new data to any of the default data sets, with automatic incrementation
export function addToDataFile(dataPath, reqBody) {
  // const defaultData = readFileSync(dataPath, "utf-8");
  // const defaultDataJson = JSON.parse(defaultData);

  const defaultDataJson = getData(datapath);

  const newData = incrementId(defaultDataJson, reqBody);
  defaultDataJson.push(newData);

  writeToDataFile(dataPath, defaultDataJson);
}

//Generic Helper Function to update existing data in the json
export function updateDataFiles(dataPath, newData) {
  var defaultData = getData(dataPath);

  newData.forEach((newObj) => {
    const index = defaultData.findIndex((obj) => obj.id === newObj.id);
    if (index !== -1) {
      defaultData[index] = { ...defaultData[index], ...newObj };
      writeToDataFile(dataPath, defaultData);
    }
  });
}

function writeToDataFile(dataPath, data) {
  writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8", (err) => {
    if (err) {
      console.error("Error writing data");
    } else {
      console.log("Success writing data");
    }
  });
}

export function deleteFromDataFile(dataPath, idArray) {
  var defaultData = getData(dataPath);

  idArray.forEach((id) => {
    const index = defaultData.findIndex(
      (obj) => obj.id == id && obj.isDeleted == false
    );

    if (index !== -1) {
      defaultData[index].isDeleted = true;
      writeToDataFile(dataPath, defaultData);
    }
  });
}
