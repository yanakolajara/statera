export const calculateTotal = (array, key) =>
  array
    .reduce((total, item) => {
      const value = parseFloat(item[key]);
      return total + value;
    }, 0)
    .toFixed(2);
