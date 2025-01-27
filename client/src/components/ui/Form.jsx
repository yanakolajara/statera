import React from 'react';
import styled from 'styled-components';
import { ReactComponent as EmailIcon } from '../../assets/icons/email.svg';
import { ReactComponent as PasswordIcon } from '../../assets/icons/password.svg';
import { ReactComponent as ShowPasswordIcon } from '../../assets/icons/show-password.svg';
import { ReactComponent as GoogleIcon } from '../../assets/icons/google.svg';
import { ReactComponent as AppleIcon } from '../../assets/icons/apple.svg';

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
    <StyledWrapper>
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
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #1e1e1e;
    padding: 30px;
    width: 450px;
    border-radius: 20px;
    border: 1px solid #333;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  ::placeholder {
    color: #666;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .flex-column > label {
    color: #fff;
    font-weight: 600;
    text-align: left;
    width: 100%;
    margin-bottom: 8px;
  }

  .inputForm {
    border: 1.5px solid #333;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: 0.2s ease-in-out;
    background-color: #252525;

    svg {
      fill: #666;
    }
  }

  .input {
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    width: 85%;
    height: 100%;
    background: transparent !important;
    color: #d9d9d9;

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-text-fill-color: #d9d9d9 !important;
      -webkit-box-shadow: 0 0 0 30px #252525 inset !important;
      box-shadow: 0 0 0 30px #252525 inset !important;
      background-color: #252525 !important;
      background-clip: content-box !important;
      transition: background-color 5000s ease-in-out 0s;
      caret-color: #d9d9d9;
    }
  }

  .input:focus {
    outline: none;
  }

  .inputForm:focus-within {
    border: 1.5px solid #4caf50;
    svg {
      fill: #4caf50;
    }
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
  }

  .flex-row > div > label {
    font-size: 14px;
    color: #fff;
    font-weight: 400;
  }

  .span {
    font-size: 14px;
    margin-left: 5px;
    color: #4caf50;
    font-weight: 500;
    cursor: pointer;
  }

  .button-submit {
    margin: 20px 0 10px 0;
    background-color: #4caf50;
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  .button-submit:hover {
    background-color: #45a049;
  }

  .p {
    text-align: center;
    color: #fff;
    font-size: 14px;
    margin: 5px 0;
  }

  .btn {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    gap: 10px;
    border: 1px solid #333;
    background-color: #252525;
    color: #fff;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  .btn:hover {
    border: 1px solid #4caf50;
    background-color: #2a2a2a;
  }
`;

export default Form;
