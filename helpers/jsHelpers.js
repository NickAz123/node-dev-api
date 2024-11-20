export function cleanArray(array, keysToRemove) {
  const arraySafe = array.map((obj) => {
    let newObj = { ...obj };

    keysToRemove.forEach((key) => {
      delete newObj[key];
    });

    return newObj;
  });

  return arraySafe.filter((obj) => obj.isDeleted != true);
}
