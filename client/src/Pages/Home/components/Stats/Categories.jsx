import React from 'react';

export default function Categories(props) {
  const categories = props.children;
  return <div className='stats__categories'>{categories}</div>;
}
