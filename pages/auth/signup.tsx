import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import Button from '../../components/button/button.component';
import Link from 'next/link';
import FormInputText from '../../components/form-input-text.tsx/form-input-text.component';
import styles from '../../styles/Signup.module.scss';
import useRequest from '../../hooks/use-request';
import { useRouter } from 'next/router';
import { BACKEND_URL } from '../_app';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { signin } from '../../features/user/user-slice';
import CircleLoader from '../../static/assets/loaders/circle-loader/circle-loader';
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from '../../util/validation/auth';
import { isButtonDisabled } from '../../util/validation/enable-button';
import ErrorComponent from '../../components/error.component';

const INITIAL_SIGN_UP_FIELDS = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Signup = () => {
  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [signupFormFields, setSignupFormFields] = useState(
    INITIAL_SIGN_UP_FIELDS
  );
  const [signupFormErrors, setSignupFormErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignupFormFields({ ...signupFormFields, [name]: value });

    switch (name) {
      case 'name':
        if (!validateName(value)) {
          setSignupFormErrors({ ...signupFormErrors, name: true });
          return;
        }
        setSignupFormErrors({ ...signupFormErrors, name: false });
        break;

      case 'email':
        if (!validateEmail(value)) {
          setSignupFormErrors({ ...signupFormErrors, email: true });
          return;
        }

        setSignupFormErrors({ ...signupFormErrors, email: false });
        break;

      case 'password':
        if (signupFormFields.confirmPassword.length > 0) {
          const errorInConfirmPassword =
            signupFormFields.confirmPassword !== value;
          const errorInPassword = !validatePassword(value);
          if (errorInPassword && errorInConfirmPassword) {
            setSignupFormErrors({
              ...signupFormErrors,
              password: true,
              confirmPassword: true,
            });
            return;
          } else if (!errorInPassword && errorInConfirmPassword) {
            setSignupFormErrors({
              ...signupFormErrors,
              password: false,
              confirmPassword: true,
            });
            return;
          } else if (!errorInPassword && !errorInConfirmPassword) {
            setSignupFormErrors({
              ...signupFormErrors,
              password: false,
              confirmPassword: false,
            });
            return;
          }
        }
        const errorInPassword = !validatePassword(value);
        if (errorInPassword) {
          setSignupFormErrors({ ...signupFormErrors, password: true });
          return;
        }

        setSignupFormErrors({ ...signupFormErrors, password: false });
        break;

      case 'confirmPassword':
        if (!validateConfirmPassword(signupFormFields.password, value)) {
          setSignupFormErrors({ ...signupFormErrors, confirmPassword: true });
          return;
        }

        setSignupFormErrors({ ...signupFormErrors, confirmPassword: false });
        break;
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await doRequest();
  };

  const { doRequest, errors } = useRequest({
    url: `${BACKEND_URL}/auth/signup`,
    method: 'post',
    onSuccess: (data) => {
      dispatch(signin(data.user));
      router.back();
    },
    body: signupFormFields,
  });

  useEffect(() => {
    if (user) {
      router.push('/profile');
    }
  }, []);

  return (
    <div className={styles.signup_wrapper}>
      <div className={styles.signup_form_wrapper}>
        <form onSubmit={handleSubmit} className={styles.form_container}>
          <h4>Signup form</h4>
          <FormInputText
            autoComplete="off"
            autoCapitalize="words"
            type="text"
            label="Name"
            name="name"
            onChange={handleChange}
            placeholder="Tom Hanks"
            required={true}
            info={true}
            validationMessage="should be atleast three alphabets"
            hasError={signupFormErrors.name}
          />
          <FormInputText
            autoComplete="off"
            type="email"
            label="Email"
            placeholder="tom@example.com"
            name="email"
            onChange={handleChange}
            required={true}
            hasError={signupFormErrors.email}
          />
          <div className={styles.password_input_container}>
            <FormInputText
              autoComplete="off"
              type={showPassword ? 'text' : 'password'}
              name="password"
              info
              validationMessage="must contain a small letter, capital letter, a digit,a special character and password length of atleast eight characters"
              onChange={handleChange}
              label="Password"
              required={true}
              hasError={signupFormErrors.password}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className={styles.password_show_control_icon}
            >
              {showPassword ? (
                <AiOutlineEye size={16} />
              ) : (
                <AiOutlineEyeInvisible size={16} />
              )}
            </span>
          </div>
          <div className={styles.password_input_container}>
            <FormInputText
              autoComplete="off"
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              onChange={handleChange}
              label="Confirm Password"
              info
              validationMessage="must match with password"
              required={true}
              hasError={signupFormErrors.confirmPassword}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className={styles.password_show_control_icon}
            >
              {showPassword ? (
                <AiOutlineEye size={16} />
              ) : (
                <AiOutlineEyeInvisible size={16} />
              )}
            </span>
          </div>
          <div className={styles.signin_description}>
            <p>Already have an account?</p>
            <p
              className={styles.signin_page_link}
              onClick={() => router.replace('/auth/signin')}
            >
              Sign In
            </p>
          </div>
          {errors && <ErrorComponent errors={errors} />}
          <Button
            type="submit"
            disabled={isButtonDisabled(
              INITIAL_SIGN_UP_FIELDS,
              signupFormFields,
              signupFormErrors
            )}
            onClick={handleSubmit}
            width="100%"
          >
            sign up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
