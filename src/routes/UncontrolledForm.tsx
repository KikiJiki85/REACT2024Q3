import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateForm } from '../store/formSlice';
import { FormData } from '../types';
import * as Yup from 'yup';

const UncontrolledForm: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const acceptTermsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    age: Yup.number().required('Age is required').positive().integer(),
    email: Yup.string().required('Email is required').email(),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .required('You should confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords should match'),
    gender: Yup.string().required('Gender is required'),
    acceptTerms: Yup.boolean().oneOf([true], 'You should accept terms'),
    picture: Yup.mixed().required('Please upload an image'),
    country: Yup.string().required('Country is required'),
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData: FormData = {
      name: nameRef.current?.value || '',
      age: parseInt(ageRef.current?.value || '0'),
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      acceptTerms: acceptTermsRef.current?.checked || false,
      picture: pictureRef.current?.files?.[0] || null,
      country: countryRef.current?.value || '',
    };

    try {
      setIsSubmitting(true);
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      dispatch(updateForm({ formType: 'uncontrolled', data: formData }));
      navigate('/');
    } catch (validationErrors) {
      const validationErrorsMap = validationErrors.inner.reduce(
        (acc: Partial<FormData>, curr: Yup.ValidationError) => {
          acc[curr.path as keyof FormData] = curr.message || '';
          return acc;
        },
        {},
      );
      setErrors(validationErrorsMap);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" ref={nameRef} required />
        {errors.name && <p className="error-message">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" ref={ageRef} required />
        {errors.age && <p className="error-message">{errors.age}</p>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" ref={emailRef} required />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" ref={passwordRef} required />
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm password:</label>
        <input
          type="password"
          id="confirmPassword"
          ref={confirmPasswordRef}
          required
        />
        {errors.confirmPassword && (
          <p className="error-message">{errors.confirmPassword}</p>
        )}
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" ref={genderRef}>
          <option value="male">Man</option>
          <option value="female">Woman</option>
        </select>
        {errors.gender && <p className="error-message">{errors.gender}</p>}
      </div>
      <div>
        <label htmlFor="acceptTerms">
          <input type="checkbox" id="acceptTerms" ref={acceptTermsRef} />
          Accept terms
        </label>
        {errors.acceptTerms && (
          <p className="error-message">{errors.acceptTerms}</p>
        )}
      </div>
      <div>
        <label htmlFor="picture">Upload picture:</label>
        <input
          type="file"
          id="picture"
          ref={pictureRef}
          accept=".png,.jpeg,.jpg"
        />
        {errors.picture && <p className="error-message">{errors.picture}</p>}
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <input type="text" id="country" ref={countryRef} required />
        {errors.country && <p className="error-message">{errors.country}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
};

export default UncontrolledForm;
