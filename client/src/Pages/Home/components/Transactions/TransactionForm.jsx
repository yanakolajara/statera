import React from 'react';
import { formatDateToServer, getDate } from '../../../../utils/date.utils';
import { TRANSACTION_CATEGORIES } from '../../../../constants/categories';

const style = {
  display: 'block',
  border: '1px solid black',
  margin: '1rem',
};

export default function TransactionForm(props) {
  console.log(props);
  const { transaction, onSubmit, onCancel } = props;
  const [formData, setFormData] = React.useState({
    description: transaction?.description || '',
    amount: transaction?.amount || '',
    type: transaction?.type || 'expense',
    date: transaction?.date || getDate(), //FIXME: Default date not showing()
    category: transaction?.category || 'Miscellaneous',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    // onSubmit(formData); //FIXME: Edit form
    setFormData({
      description: '',
      amount: '',
      type: 'expense',
      date: '',
      category: 'Miscellaneous',
    });
  }

  return (
    <form style={style} onSubmit={handleSubmit}>
      {onCancel && (
        <button type='button' onClick={onCancel}>
          Cancel
        </button>
      )}
      <input
        type='text'
        name='description'
        value={formData.description}
        onChange={handleChange}
        placeholder='Add a description'
      />
      <input
        type='number'
        name='amount'
        value={formData.amount}
        onChange={handleChange}
        placeholder='Amount'
      />
      <select name='category' value={formData.category} onChange={handleChange}>
        {TRANSACTION_CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <select name='type' value={formData.type} onChange={handleChange}>
        <option value='income'>Income</option>
        <option value='expense'>Expense</option>
      </select>
      <input
        type='date'
        name='date'
        value={formData.date}
        onChange={handleChange}
      />
      <input type='submit' value='submit' />
    </form>
  );
}
