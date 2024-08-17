import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { updateForm } from '../store/formSlice.ts';
import { FormData } from '../types.ts';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Имя обязательно')
    .matches(/^[A-Z]/, 'Имя должно начинаться с заглавной буквы'),
  age: Yup.number()
    .required('Возраст обязателен')
    .positive('Возраст должен быть положительным')
    .integer('Возраст должен быть числом'),
  email: Yup.string()
    .required('Email обязателен')
    .email('Введите корректный Email'),
  password: Yup.string()
    .required('Пароль обязателен')
    .matches(
      /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*?&])/,
      'Пароль должен содержать хотя бы одну цифру, заглавную и строчную буквы, специальный символ',
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
    .required('Подтверждение пароля обязательно'),
  gender: Yup.string().required('Пол обязателен'),
  acceptTerms: Yup.boolean().oneOf(
    [true],
    'Необходимо принять условия и положения',
  ),
  picture: Yup.mixed()
    .required('Загрузите картинку')
    .test(
      'fileSize',
      'Размер картинки слишком велик',
      value => !value || (value && value.size <= 1048576),
    )
    .test(
      'fileType',
      'Неподдерживаемый формат',
      value =>
        !value || (value && ['image/jpeg', 'image/png'].includes(value.type)),
    ),
  country: Yup.string().required('Страна обязательна'),
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
          <option value="female">Women</option>
        </select>
        {errors.gender && <p>{errors.gender.message}</p>}
      </div>
      <div>
        <label htmlFor="acceptTerms">
          <input type="checkbox" {...register('acceptTerms')} />
          accept Terms and Conditions agreement
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
              onChange={e => field.onChange(e.target.files?.[0])}
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
