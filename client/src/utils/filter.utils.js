export const filterByKey = (array, key, value) =>
  array.length === 0
    ? []
    : array.filter((item) => item[key].toLowerCase() === value.toLowerCase());
