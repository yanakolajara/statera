export const getDisposableIncome = (data) =>
  data.reduce((acc, cur) => {
    if (cur.type === 'income') {
      acc += cur.amount;
    } else {
      acc -= cur.amount;
    }
    return acc;
  }, 0);
