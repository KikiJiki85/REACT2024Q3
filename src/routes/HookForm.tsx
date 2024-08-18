import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateForm } from '../store/formSlice';
import { FormData } from '../types';
import { convertToBase64, validationSchema } from '../utils';

const HookForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    if (data.picture instanceof File) {
      const base64Image = await convertToBase64(data.picture);
      data.picture = base64Image;
    }
    dispatch(updateForm({ formType: 'controlled', data }));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" {...register('name')} />
        <p className="error-message">
          {errors.name ? errors.name.message : <span>&nbsp;</span>}
        </p>
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input id="age" type="number" {...register('age')} />
        <p className="error-message">
          {errors.age ? errors.age.message : <span>&nbsp;</span>}
        </p>
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" {...register('email')} />
        <p className="error-message">
          {errors.email ? errors.email.message : <span>&nbsp;</span>}
        </p>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" {...register('password')} />
        <p className="error-message">
          {errors.password ? errors.password.message : <span>&nbsp;</span>}
        </p>
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm password:</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
        />
        <p className="error-message">
          {errors.confirmPassword ? (
            errors.confirmPassword.message
          ) : (
            <span>&nbsp;</span>
          )}
        </p>
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" {...register('gender')}>
          <option value="male">Man</option>
          <option value="female">Woman</option>
        </select>
        <p className="error-message">
          {errors.gender ? errors.gender.message : <span>&nbsp;</span>}
        </p>
      </div>
      <div>
        <label htmlFor="acceptTerms">
          <input
            id="acceptTerms"
            type="checkbox"
            {...register('acceptTerms')}
          />
          Accept Terms and Conditions agreement
        </label>
        <p className="error-message">
          {errors.acceptTerms ? (
            errors.acceptTerms.message
          ) : (
            <span>&nbsp;</span>
          )}
        </p>
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
        <p className="error-message">
          {errors.picture ? errors.picture.message : <span>&nbsp;</span>}
        </p>
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <input id="country" type="text" {...register('country')} />
        <p className="error-message">
          {errors.country ? errors.country.message : <span>&nbsp;</span>}
        </p>
      </div>
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default HookForm;
