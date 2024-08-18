import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateForm } from '../store/formSlice';
import { FormData } from '../types';
import { convertToBase64, validationSchema } from '../utils';
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const pictureFile: File | null = pictureRef.current?.files?.[0] || null;

    const formData: FormData = {
      name: nameRef.current?.value || '',
      age: parseInt(ageRef.current?.value || '0'),
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      acceptTerms: acceptTermsRef.current?.checked || false,
      picture: pictureFile,
      country: countryRef.current?.value || '',
    };

    try {
      setIsSubmitting(true);
      await validationSchema.validate(formData, { abortEarly: false });

      const pictureBase64 = pictureFile
        ? await convertToBase64(pictureFile)
        : null;
      formData.picture = pictureBase64;

      setErrors({});
      dispatch(updateForm({ formType: 'uncontrolled', data: formData }));
      navigate('/');
    } catch (validationErrors) {
      const validationErrorsMap = (
        validationErrors as Yup.ValidationError
      ).inner.reduce((acc: Partial<FormData>, curr: Yup.ValidationError) => {
        acc[curr.path as keyof FormData] = curr.message || undefined;
        return acc;
      }, {});

      setErrors(validationErrorsMap);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" ref={nameRef} />
        <p className="error-message">{errors.name || <>&nbsp;</>}</p>
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" ref={ageRef} />
        <p className="error-message">{errors.age || <>&nbsp;</>}</p>
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" ref={emailRef} />
        <p className="error-message">{errors.email || <>&nbsp;</>}</p>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" ref={passwordRef} />
        <p className="error-message">{errors.password || <>&nbsp;</>}</p>
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm password:</label>
        <input type="password" id="confirmPassword" ref={confirmPasswordRef} />
        <p className="error-message">{errors.confirmPassword || <>&nbsp;</>}</p>
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" ref={genderRef}>
          <option value="male">Man</option>
          <option value="female">Woman</option>
        </select>
        <p className="error-message">{errors.gender || <>&nbsp;</>}</p>
      </div>
      <div>
        <label htmlFor="acceptTerms">
          <input type="checkbox" id="acceptTerms" ref={acceptTermsRef} />
          Accept Terms and Conditions agreement
        </label>
        <p className="error-message">{errors.acceptTerms || <>&nbsp;</>}</p>
      </div>
      <div>
        <label htmlFor="picture">Upload picture:</label>
        <input
          type="file"
          id="picture"
          ref={pictureRef}
          accept=".png,.jpeg,.jpg"
        />
        <p className="error-message">
          {typeof errors.picture === 'string' ? errors.picture : <>&nbsp;</>}
        </p>
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <input type="text" id="country" ref={countryRef} />
        <p className="error-message">{errors.country || <>&nbsp;</>}</p>
      </div>

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
};

export default UncontrolledForm;
