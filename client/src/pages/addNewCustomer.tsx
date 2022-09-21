import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import RadioGroup from '../components/RadioGroup';
import ToastBox from '../components/ToastBox';

const initialState = {
  photo: null,
  email: null,
  password: null,
  confirmPassword: null,
  name: null,
  phone: null,
  birthday: null,
  nrc: null,
  gender: null,
};

function AddNewCustomer() {
  const nav = useNavigate();
  const [customerForm, setCustomerForm] = useState({
    photo: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    birthday: '',
    nrc: '',
    gender: '',
  });
  const [formErrors, setFormErrors] = useState(initialState);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(false);
  const onSubmit = async () => {
    setFormErrors(initialState);
    if (isValid) {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/customer/`, {
        method: 'POST', headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerForm)
      }).then((response) => {
        if (!response.ok) { throw new Error('Fail to create customer'); }
        else return response.json();
      }).then(() => {
        nav('/');
      }).catch(() => {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
      });
    } else {
      for (const key in customerForm) {
        if (`${customerForm[key as keyof typeof customerForm]}`.length <= 0) {
          setFormErrors((formErrors) => ({ ...formErrors, [key]: 'error' }));
        }
      }
    }
  };

  useEffect(() => {
    if (
      customerForm.photo.length > 0 &&
      customerForm.phone.length > 0 &&
      customerForm.email.length > 0 &&
      customerForm.nrc.length > 0 &&
      customerForm.confirmPassword.length > 0 &&
      customerForm.password.length > 0 &&
      customerForm.gender.length > 0 &&
      customerForm.birthday.length > 0 &&
      customerForm.name.length > 0
    ) {
      setIsValid(true);
    } else setIsValid(false);
  }, [customerForm]);

  const validateField = (event: any) => {
    setCustomerForm({
      ...customerForm,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className='form-card'>
      <div className='form'>
        <InputField
          name='photo'
          label='Photo'
          type='file'
          onChange={(event) => validateField(event)}
          value={customerForm.photo}
        />
        {formErrors?.photo && (
          <p className='error-text'>Please fill out this field.</p>
        )}
        <InputField
          name='email'
          label='Email'
          onChange={(event) => validateField(event)}
          value={customerForm.email}
        />
        {formErrors?.email && (
          <p className='error-text'>Please fill out this field.</p>
        )}
        <InputField
          name='password'
          label='Password'
          type='password'
          description='At least 1 uppercase character, 1 lowercase character, and 1 number'
          onChange={(event) => validateField(event)}
          value={customerForm.password}
        />
        {formErrors?.password && (
          <p className='error-text'>Please fill out this field.</p>
        )}
        <InputField
          name='confirmPassword'
          label='Confirm Password'
          type='password'
          description='must match the field above'
          onChange={(event) => validateField(event)}
          value={customerForm.confirmPassword}
        />
        {formErrors?.confirmPassword && (
          <p className='error-text'>Please fill out this field.</p>
        )}
        <InputField
          name='name'
          label='Name'
          description='must be between 3 and 9 characters long'
          onChange={(event) => validateField(event)}
          value={customerForm.name}
        />
        {formErrors?.name && (
          <p className='error-text'>Please fill out this field.</p>
        )}
        <InputField
          name='phone'
          label='Phone Number'
          type='number'
          onChange={(event) => validateField(event)}
          value={customerForm.phone}
        />
        {formErrors?.phone && (
          <p className='error-text'>Please fill out this field.</p>
        )}
        <InputField
          name='birthday'
          label='Birthday'
          type='date'
          description='YYYY-MM-DD'
          onChange={(event) => validateField(event)}
          value={customerForm.birthday}
        />
        {formErrors?.birthday && (
          <p className='error-text'>Please fill out this field.</p>
        )}
        <InputField
          name='nrc'
          label='NRC'
          onChange={(event) => validateField(event)}
          value={customerForm.nrc}
        />
        {formErrors?.nrc && (
          <p className='error-text'>Please fill out this field.</p>
        )}
        <RadioGroup
          name='gender'
          label='Gender'
          items={['Male', 'Female']}
          onChange={(event) => validateField(event)}
        />
        {formErrors?.gender && (
          <p className='error-text'>Please fill out this field.</p>
        )}
        <button className='form-submit-btn btn-primary' onClick={onSubmit}>
          Sign In
        </button>
      </div>
      {error && <ToastBox message='Fail to create customer.' />}
    </div>
  );
}

export default AddNewCustomer;
