import * as fh from "../helpers/fileHelpers.js";
import * as jh from "../helpers/jsHelpers.js";
import * as bh from "../helpers/bcryptHelpers.js";

const filePath = "./data/users.json";

//Gets all users in the data struct
export function getUsers() {
    var users = fh.getData(filePath);
    return users;
}

//Gets all users in the data struct with no passwords
export function getUsersSafe() {
    var users = fh.getData(filePath);
    return getSafeUsersArray(users);
}

//Gets a single user in the data struct
export function getUser(userId) {
    const usersArr = getUsers();

    const resultsArr = usersArr.filter((obj) => {
        return obj["id"] == userId;
    });

    return resultsArr[0];
}

//Gets a single user in the data struct with no passwords
export function getUserSafe(userId) {
    const usersArr = getUsersSafe();

    const resultsArr = usersArr.filter((obj) => {
        return obj["id"] == userId;
    });

    return resultsArr[0];
}

//Updates data struct from an array of users, will not update password
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

//Deletes users from an array of ID's
export function deleteUsers(idArray) {
    fh.deleteFromDataFile(filePath, idArray);
}

//Private function that removes password keys from an array of user objects
function getSafeUsersArray(users) {
    const keysToRemove = ["password", "passwordSalt", "passwordPepper"];

    return jh.cleanArray(users, keysToRemove);
}

//Password Handling using bcrypt
export async function userPasswordMatch(currentPassword, inputPassword) {
    const currentPasswordIsValid = await bh.comparePassword(
        inputPassword,
        currentPassword,
    );
    return currentPasswordIsValid;
}

export async function hashNewUserPassword(user) {
    user.password = await hashPassword(user.password);
    return user;
}

export async function hashPassword(password) {
    return await bh.hashPassword(password);
}
