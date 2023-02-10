import React from 'react';
import FormInputText from '../../components/form-input-text.tsx/form-input-text.component';
import styles from '../../styles/PasswordChange.module.scss';
import Button from '../../components/button/button.component';

const PasswordChange = () => {
  return (
    <div className={styles.password_change_wrapper}>
      <div className={styles.password_change_form_wrapper}>
        <form className={styles.form_container}>
          <p>password change for email</p>
          <FormInputText
            autoComplete="false"
            type="password"
            label="enter new password"
            required={true}
          />{' '}
          <FormInputText
            autoComplete="false"
            type="password"
            label="confirm password"
            required={true}
          />
          <Button type="submit" width="100%">
            Change Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PasswordChange;
