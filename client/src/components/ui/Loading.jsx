import React from 'react';
import './Loading.scss';

export default function Loading() {
  return (
    <div className='loading-container'>
      <div className='loading-spinner'>
        <div className='spinner-circle'></div>
        <div className='spinner-circle'></div>
        <div className='spinner-circle'></div>
      </div>
    </div>
  );
}
