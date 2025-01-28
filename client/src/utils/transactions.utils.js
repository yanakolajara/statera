export const getDisposableIncome = (data) =>
  data.reduce((acc, cur) => {
    if (cur.type === 'income') {
      acc += Number(cur.amount);
    } else {
      acc -= Number(cur.amount);
    }
    return acc;
  }, 0);
