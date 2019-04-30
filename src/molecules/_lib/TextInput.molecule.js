import React from 'react'
import classnames from 'classnames';

const TextInput = props => {
  const {
    id,
    className,
    value,
    type,
    handleChange,
    handleBlur,
    placeholder,
    error,
    disabled
  } = props;

  const classNames = ['text-input', className];
  if(error) classNames.push('-error');

  return (
    <div id={`text-input-${id}`} className={classnames(classNames)}>
      <input
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        type={type || 'text'}
        onBlur={handleBlur}
        disabled={disabled}
      />
      {error && <div className='error'>{error}</div>}
    </div>
  )
}

export { TextInput };