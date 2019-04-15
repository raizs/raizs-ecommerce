import React from 'react'

export const FacebookButton = ({ id, className, clickAction }) => (
  <button onClick={clickAction} id={id} className={className}>
    <img alt='facebook login button' src='/icons/facebook.jpg' />
    <p>
      Facebook
    </p>
  </button>
);