import * as fh from "../helpers/fileHelpers.js";

const filePath = "./data/users.json";

export function getUsers() {
  return fh.getData(filePath);
}

export function getUser(params) {
  const usersArr = fh.getData(filePath);

  const resultsArr = usersArr.find((obj) => {
    return Object.keys(params).every((key) => {
      return obj[key] == params[key];
    });
  });

  return resultsArr;
}
