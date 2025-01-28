import React from 'react';
import { ReactComponent as EmailIcon } from '../../assets/icons/email.svg';
import { ReactComponent as PasswordIcon } from '../../assets/icons/password.svg';
import { ReactComponent as ShowPasswordIcon } from '../../assets/icons/show-password.svg';
import { ReactComponent as GoogleIcon } from '../../assets/icons/google.svg';
import { ReactComponent as AppleIcon } from '../../assets/icons/apple.svg';
import './Form.scss';

const Form = ({
  fields,
  values,
  onChange,
  onSubmit,
  submitText = 'Submit',
  showSocialLogin = false,
}) => {
  const getIcon = (type) => {
    switch (type) {
      case 'email':
        return <EmailIcon />;
      case 'password':
        return <PasswordIcon />;
      default:
        return <EmailIcon />;
    }
  };

  return (
    <form className='form' onSubmit={onSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <div className='flex-column'>
            <label>{field.label}</label>
          </div>
          <div className='inputForm'>
            {getIcon(field.type)}
            <input
              type={field.type}
              className={`input ${field.className || ''}`}
              name={field.name}
              value={values[field.name] || ''}
              onChange={onChange}
              placeholder={field.placeholder}
              required={field.required}
            />
            {field.type === 'password' && <ShowPasswordIcon />}
          </div>
        </div>
      ))}

      <button className='button-submit' type='submit'>
        {submitText}
      </button>

      {showSocialLogin && (
        <>
          <p className='p line'>Or With</p>
          <div className='flex-row'>
            <button type='button' className='btn google'>
              <GoogleIcon />
              Google
            </button>
            <button type='button' className='btn apple'>
              <AppleIcon />
              Apple
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default Form;
