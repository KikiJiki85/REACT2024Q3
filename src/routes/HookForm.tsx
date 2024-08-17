import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { updateForm } from '../store/formSlice';
import { FormData } from '../types';

const validationSchema = Yup.object().shape({
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

const HookForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    dispatch(updateForm({ formType: 'hook', data }));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input type="number" {...register('age')} />
        {errors.age && <p>{errors.age.message}</p>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm password:</label>
        <input type="password" {...register('confirmPassword')} />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select {...register('gender')}>
          <option value="male">Man</option>
          <option value="female">Woman</option>
        </select>
        {errors.gender && <p>{errors.gender.message}</p>}
      </div>
      <div>
        <label htmlFor="acceptTerms">
          <input type="checkbox" {...register('acceptTerms')} />
          Accept Terms and Conditions agreement
        </label>
        {errors.acceptTerms && <p>{errors.acceptTerms.message}</p>}
      </div>
      <div>
        <label htmlFor="picture">Upload picture:</label>
        <Controller
          name="picture"
          control={control}
          render={({ field }) => (
            <input
              type="file"
              onChange={e => field.onChange(e.target.files?.[0] || null)}
              accept=".png,.jpeg,.jpg"
            />
          )}
        />
        {errors.picture && <p>{errors.picture.message}</p>}
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <input {...register('country')} />
        {errors.country && <p>{errors.country.message}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default HookForm;
