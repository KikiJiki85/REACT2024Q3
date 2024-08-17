import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateForm } from '../store/formSlice.ts';
import { FormData } from '../types.ts';

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formData: FormData = {
      name: nameRef.current?.value || '',
      age: parseInt(ageRef.current?.value || '0'),
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      acceptTerms: acceptTermsRef.current?.checked || false,
      picture: pictureRef.current?.files?.[0]
        ? URL.createObjectURL(pictureRef.current?.files[0])
        : '',
      country: countryRef.current?.value || '',
    };

    dispatch(updateForm({ formType: 'uncontrolled', data: formData }));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" ref={nameRef} required />
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" ref={ageRef} required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" ref={emailRef} required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" ref={passwordRef} required />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm password:</label>
        <input
          type="password"
          id="confirmPassword"
          ref={confirmPasswordRef}
          required
        />
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" ref={genderRef}>
          <option value="male">Man</option>
          <option value="female">Women</option>
        </select>
      </div>
      <div>
        <label htmlFor="acceptTerms">
          <input type="checkbox" id="acceptTerms" ref={acceptTermsRef} />
          Accept terms
        </label>
      </div>
      <div>
        <label htmlFor="picture">Upload picture:</label>
        <input
          type="file"
          id="picture"
          ref={pictureRef}
          accept=".png,.jpeg,.jpg"
        />
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <input type="text" id="country" ref={countryRef} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledForm;
