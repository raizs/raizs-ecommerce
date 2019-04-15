import React from 'react'

export const GoogleButton = ({ id, className, clickAction }) => (
  <button onClick={clickAction} id={id} className={className}>
    <img alt='google login button' src='/icons/google-plus.png' />
    <p>
      Google
    </p>
  </button>
);