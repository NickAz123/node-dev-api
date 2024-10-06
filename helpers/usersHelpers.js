import * as fh from "../helpers/fileHelpers.js";

const filePath = "./data/users.json";

export function getUsers() {
  return fh.getData(filePath);
}

export function getUser(params) {
  const usersArr = fh.getData(filePath);

  const resultsArr = usersArr.filter((obj) => {
    return Object.keys(params).every((key) => {
      return obj[key] == params[key];
    });
  });

  return resultsArr;
}

export function updateUsers(data) {
  const usersArr = fh.getData(filePath);
  var foundData = false;

  data.forEach((userObj) => {
    const index = usersArr.findIndex((user) => user.id == userObj.id);

    if (index !== -1) {
      for (let key in userObj) {
        if (
          userObj.hasOwnProperty(key) &&
          usersArr[index][key] !== userObj[key]
        ) {
          usersArr[index][key] = userObj[key];
        }
      }
    }

    foundData = true;
  });

  if (foundData) {
    fh.updateDataFiles(filePath, usersArr);
  }
}
