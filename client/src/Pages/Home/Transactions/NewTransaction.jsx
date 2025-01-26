import React from 'react';

const style = {
  border: '1px solid black',
  margin: '1rem',
};
export default function NewTransaction() {
  return (
    <article style={style}>
      <input type='text' name='description' placeholder='Add a description' />
      <section>
        <input type='number' name='amount' placeholder='Amount' />
        <select name='type'>
          <option value='income'>Income</option>
          <option value='expense'>Expense</option>
        </select>
        <input type='date' name='date' id='' />
        <button>Add</button>
      </section>
    </article>
  );
}
