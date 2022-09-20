import React, { ChangeEventHandler } from 'react';

function RadioGroup({
  items,
  name,
  label,
  onChange,
}: {
  items: string[];
  name: string;
  label?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className='radio-group'>
      <label>{label}</label>
      <div className='radio-items'>
        {items.map((item, i) => {
          return (
            <div key={i} className='radio-item'>
              <input
                name={name}
                type='radio'
                id={i.toString()}
                value={item}
                onChange={onChange}
              />
              <label htmlFor={i.toString()}>{item}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RadioGroup;
