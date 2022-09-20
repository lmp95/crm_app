import React, { ChangeEventHandler } from 'react';
import PropTypes from 'prop-types';

function InputField({
  name,
  prefix,
  label,
  type,
  placeholder,
  onChange,
  error,
  description,
  value,
}: {
  name: string;
  prefix?: PropTypes.ReactNodeLike;
  label?: string;
  type?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  error?: boolean;
  description?: string;
  value?: string;
}) {
  return (
    <div className={`input-container ${description ? 'with-desc' : ''}`}>
      <label>{label}</label>
      <div className='input-field'>
        {prefix && <span className='prefix'>{prefix}</span>}
        <input
          name={name}
          value={value}
          className={`${type === 'file' ? 'file-input' : ''}`}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
        />
        {error && <span className='error'>Please fill out this field</span>}
        {description && <span className='description'>{description}</span>}
      </div>
    </div>
  );
}

export default InputField;

InputField.propTypes = {
  prefix: PropTypes.node,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};
