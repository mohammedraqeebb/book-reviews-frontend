import React, { ChangeEvent, useState } from 'react';
import styles from './OTPInput.module.scss';

const OTPInput = () => {
  const [otp, setOTP] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOTP(e.target.value);
  };

  return (
    <div className="otp-input-container">
      <input
        type="tel"
        pattern="[0-9]*"
        inputMode="numeric"
        className="otp-input"
        value={otp}
        onChange={handleChange}
        maxLength={6}
      />
    </div>
  );
};

export default OTPInput;
