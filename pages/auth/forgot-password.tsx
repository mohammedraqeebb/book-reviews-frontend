import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import Button from '../../components/button/button.component';
import ErrorComponent from '../../components/error.component';
import FormInputText from '../../components/form-input-text.tsx/form-input-text.component';
import useRequest from '../../hooks/use-request';
import styles from '../../styles/ForgotPassword.module.scss';
import { validateEmail } from '../../util/validation/auth';
import { BACKEND_URL } from '../_app';

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailValidationError, setEmailValidationError] = useState(false);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailValidationError(true);
      return;
    }
    setEmailValidationError(false);
  };
  const { doRequest, errors } = useRequest({
    url: `${BACKEND_URL}/auth/forgotpassword`,
    method: 'post',
    body: { email },
    onSuccess: () => {
      localStorage.setItem('email', email);
      router.push('/auth/verify-otp');
    },
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <div className={styles.forgot_password_wrapper}>
      <div className={styles.forgot_password_form_wrapper}>
        <form onSubmit={handleSubmit} className={styles.form_container}>
          <h5>Enter your registered email</h5>
          <FormInputText
            autoComplete="off"
            hasError={emailValidationError}
            type="email"
            label="Email (please check spam)"
            info
            validationMessage="check spam"
            name="email"
            value={email}
            placeholder="tom@example.com"
            onChange={handleChange}
            required={true}
          />
          {errors && <ErrorComponent errors={errors} />}
          <p className={styles.signup_description}>
            Didn&apos;t find your account?
            <Link className={styles.signup_page_link} href="/auth/signup">
              Create One
            </Link>
          </p>
          <Button
            onClick={handleSubmit}
            disabled={!validateEmail(email)}
            type="submit"
            width="100%"
          >
            Get OTP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
