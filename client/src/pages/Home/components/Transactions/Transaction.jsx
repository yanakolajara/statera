import React, { useState } from 'react';
import TransactionForm from './TransactionForm';
import { getDate } from '../../../../utils/date.utils';

const style = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '1rem',
  marginBottom: '1rem',
};
export default function Transaction(props) {
  const { transaction, editTransaction, removeTransaction } = props;
  const {
    id,
    amount,
    type,
    // category,
    description,
    date,
  } = transaction;
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li className='transaction' style={style}>
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
          <span className='transaction__icon'></span>
          <div className='transaction__data'>
            <div className='info'>
              <h3 className='description'>{description}</h3>
              <p className='date'>{getDate(date)}</p>
            </div>
            <div className='amount'>
              <p className={`${type === 'income' ? 'positive' : 'negative'}`}>
                ${amount}
              </p>
            </div>
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
