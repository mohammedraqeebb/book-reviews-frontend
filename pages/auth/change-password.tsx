import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Button from '../../components/button/button.component';
import ErrorComponent from '../../components/error.component';
import FormInputText from '../../components/form-input-text.tsx/form-input-text.component';
import useRequest from '../../hooks/use-request';
import styles from '../../styles/ChangePassword.module.scss';
import {
  validateConfirmPassword,
  validatePassword,
} from '../../util/validation/auth';
import { isButtonDisabled } from '../../util/validation/enable-button';
import { BACKEND_URL } from '../_app';
const INITIAL_CHANGE_PASSWORD_FIELDS = {
  password: '',
  confirmPassword: '',
};
const ChangePassword = () => {
  const [changePasswordFormFields, setChangePasswordFormFields] = useState(
    INITIAL_CHANGE_PASSWORD_FIELDS
  );
  const [email, setEmail] = useState('');
  useEffect(() => {
    setEmail(localStorage.getItem('email') ?? '');
  }, []);
  const router = useRouter();
  const [changePasswordFormErrors, setChangePasswordFormErrors] = useState({
    password: false,
    confirmPassword: false,
  });
  const { doRequest, errors } = useRequest({
    url: `${BACKEND_URL}/auth/changepassword`,
    method: 'post',
    onSuccess: () => {
      router.replace('/auth/signin');
    },
    body: {
      password: changePasswordFormFields.password,
      email,
    },
  });
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setChangePasswordFormFields({ ...changePasswordFormFields, [name]: value });

    switch (name) {
      case 'password':
        if (changePasswordFormFields.confirmPassword.length > 0) {
          const errorInConfirmPassword =
            changePasswordFormFields.confirmPassword !== value;
          const errorInPassword = !validatePassword(value);
          if (errorInPassword && errorInConfirmPassword) {
            setChangePasswordFormErrors({
              ...changePasswordFormErrors,
              password: true,
              confirmPassword: true,
            });
            return;
          } else if (!errorInPassword && errorInConfirmPassword) {
            setChangePasswordFormErrors({
              ...changePasswordFormErrors,
              password: false,
              confirmPassword: true,
            });
            return;
          } else if (!errorInPassword && !errorInConfirmPassword) {
            setChangePasswordFormErrors({
              ...changePasswordFormErrors,
              password: false,
              confirmPassword: false,
            });
            return;
          }
        }
        const errorInPassword = !validatePassword(value);
        if (errorInPassword) {
          setChangePasswordFormErrors({
            ...changePasswordFormErrors,
            password: true,
          });
          return;
        }

        setChangePasswordFormErrors({
          ...changePasswordFormErrors,
          password: false,
        });
        break;

      case 'confirmPassword':
        if (
          !validateConfirmPassword(changePasswordFormFields.password, value)
        ) {
          setChangePasswordFormErrors({
            ...changePasswordFormErrors,
            confirmPassword: true,
          });
          return;
        }

        setChangePasswordFormErrors({
          ...changePasswordFormErrors,
          confirmPassword: false,
        });
        break;
    }
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await doRequest();
  };
  return (
    <div className={styles.change_password_wrapper}>
      <div className={styles.change_password_container}>
        <form
          onSubmit={handleSubmit}
          className={styles.change_password_form_container}
        >
          <h5>change password form</h5>
          <FormInputText
            label="Password"
            name="password"
            autoComplete="off"
            value={changePasswordFormFields.password}
            required
            hasError={changePasswordFormErrors.password}
            info={true}
            onChange={handleChange}
            validationMessage="must contain a small letter, a capital letter, a digit,a special character and password length of atleast eight characters"
          />
          <FormInputText
            autoComplete="off"
            label="Confirm Password"
            name="confirmPassword"
            value={changePasswordFormFields.confirmPassword}
            hasError={changePasswordFormErrors.confirmPassword}
            required
            onChange={handleChange}
            info={true}
            validationMessage="must match with password"
          />
          {errors && <ErrorComponent errors={errors} />}
          <div className={styles.link_container}>
            <Link href="/auth/forgot-password">
              try again, changing Password?
            </Link>
          </div>

          <Button
            disabled={isButtonDisabled(
              INITIAL_CHANGE_PASSWORD_FIELDS,
              changePasswordFormFields,
              changePasswordFormErrors
            )}
            type="submit"
            width="100%"
          >
            change password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
