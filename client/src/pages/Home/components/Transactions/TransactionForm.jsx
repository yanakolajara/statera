import React from 'react';
import { TRANSACTION_CATEGORIES } from '../../../../constants/categories';
import { format } from 'date-fns';

export default function TransactionForm(props) {
  const { transaction, onSubmit, onCancel } = props;
  const [formData, setFormData] = React.useState({
    description: transaction?.description || '',
    amount: transaction?.amount || '',
    type: transaction?.type || 'expense',
    date: transaction?.date || format(new Date(), 'yyyy-MM-dd'),
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
    onSubmit(formData);
    setFormData({
      description: '',
      amount: '',
      type: 'expense',
      date: format(new Date(), 'yyyy-MM-dd'),
      category: 'Miscellaneous',
    });
  }

  return (
    <form
      className={`transaction__form ${onCancel ? 'edit' : 'create'}`}
      onSubmit={handleSubmit}
    >
      <label htmlFor=''>Description</label>
      <input
        type='text'
        name='description'
        value={formData.description}
        onChange={handleChange}
        placeholder='Add a description'
        required
      />

      <div className='form-containers amount-type'>
        <input
          type='number'
          name='amount'
          value={formData.amount}
          onChange={handleChange}
          placeholder='Amount'
          required
        />
        <select
          name='type'
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value='income'>Income</option>
          <option value='expense'>Expense</option>
        </select>
      </div>
      <div className='form-containers details'>
        {' '}
        <input
          type='date'
          name='date'
          value={formData.date}
          onChange={handleChange}
          required
        />
        <select
          name='category'
          value={formData.category}
          onChange={handleChange}
          required
        >
          {TRANSACTION_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className='form-containers form-actions'>
        {onCancel && (
          <button
            className='form-actions__btn'
            type='button'
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
        <input className='form-actions__btn' type='submit' value='submit' />
      </div>
    </form>
  );
}
