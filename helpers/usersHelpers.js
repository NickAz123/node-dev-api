import * as fh from "../helpers/fileHelpers.js";

const filePath = "./data/users.json";

export function getUsers() {
  var users = fh.getData(filePath);
  return users.filter((user) => user.isDeleted != true);
}

export function getUser(userId) {
  const usersArr = getUsers();

  const resultsArr = usersArr.filter((obj) => {
    return obj["id"] == userId;
  });

  return resultsArr;
}

export function updateUsers(data) {
  const usersArr = getUsers();
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

export function deleteUsers(idArray) {
  fh.deleteFromDataFile(filePath, idArray);
}
