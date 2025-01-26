import React, { useState } from 'react';
import TransactionForm from './TransactionForm';
import { getDate } from '../../../../utils/date.utils';

const style = {
  display: 'flex',
  'flex-direction': 'row',
  'justify-content': 'space-between',
  'align-items': 'center',
  'padding-bottom': '1rem',
  'margin-bottom': '1rem',
};
export default function Transaction(props) {
  const { key, transaction, editTransaction, removeTransaction } = props;
  const { id, user_id, amount, type, category, description, date } =
    transaction;
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li key={key} className='transaction' style={style}>
      {isEditing ? (
        <TransactionForm
          transaction={transaction}
          onSubmit={(data) => {
            editTransaction(id, data);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <span className='transaction__icon'>Icon</span>
          <div className='transaction__data'>
            <h3>{description}</h3>
            <p>{getDate(date)}</p>
            <p>${amount}</p>
          </div>
          <div className='transaction__options'>
            <button className='edit btn' onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button
              className='delete btn'
              onClick={() => removeTransaction(id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}
