import * as Yup from 'yup';

export const convertToBase64 = (file: File): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        resolve(null);
      }
    };
    reader.onerror = error => reject(error);
  });
};

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'Name should start with the capital letter'),
  age: Yup.number()
    .required('Age is required')
    .positive('Age must be positive')
    .integer('Age should be a number'),
  email: Yup.string()
    .required('Email is required')
    .email('Please enter correct Email'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*?&])/,
      'Password should contain at least one number, one uppercased letter, one lowercased letter, and one special character',
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords should match')
    .required('You should confirm your password'),
  gender: Yup.string().required('Gender is required'),
  acceptTerms: Yup.boolean().oneOf(
    [true],
    'You should accept terms and conditions',
  ),
  picture: Yup.mixed()
    .required('Please upload an image')
    .test(
      'fileSize',
      'File size is too big',
      value => value && (value as File).size <= 1048576,
    )
    .test(
      'fileType',
      'Unsupported format',
      value =>
        value && ['image/jpeg', 'image/png'].includes((value as File).type),
    ),
  country: Yup.string().required('Country is required'),
});
