import * as yup from 'yup';

export const emailSchema = yup
  .string()
  .required('This field is required!')
  .email('Enter valid email!');

// Text contain at least: 1 uppercase letter, 1 lowercased letter, 1 number or special character
const passwordRegexp = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export const passwordSchema = yup
  .string()
  .required('This field is required!')
  .matches(
    passwordRegexp,
    'Password should include at least: 1 uppercase letter, 1 lowercased letter, 1 number or special character.'
  );
