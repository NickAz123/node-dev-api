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

export function updateUser(user) {
  const usersArr = fh.getData(filePath);
  const index = usersArr.findIndex((userObj) => userObj.id == user.id);

  if (index !== -1) {
    for (let key in user) {
      if (user.hasOwnProperty(key) && usersArr[index][key] !== user[key]) {
        usersArr[index][key] = user[key];
      }
    }

    fh.updateDataFiles(filePath, [usersArr[index]]);
  }
}
