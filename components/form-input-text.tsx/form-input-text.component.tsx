import React, {
  InputHTMLAttributes,
  FC,
  useState,
  MouseEvent,
  useEffect,
} from 'react';
import styles from './FormInputText.module.scss';
import { AiOutlineInfoCircle } from 'react-icons/ai';

type FormInputTextProps = {
  label: string;
  required: boolean;
  height?: number;
  info?: boolean;
  hasError?: boolean;
  validationMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;
const FormInputText: FC<FormInputTextProps> = ({
  label,
  required,
  height = 40,
  info,
  hasError,
  validationMessage,
  ...otherprops
}) => {
  const [showValidationRuleContainer, setShowValidationRuleContainer] =
    useState(false);

  const handleShowValidationRuleContainer = (
    event: MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    setShowValidationRuleContainer(!showValidationRuleContainer);
  };

  useEffect(() => {
    if (!showValidationRuleContainer) {
      return;
    }
    const setTimeOutTime = setTimeout(() => {
      setShowValidationRuleContainer(false);
    }, 3000);
    return () => clearTimeout(setTimeOutTime);
  }, [showValidationRuleContainer]);

  return (
    <div style={{ height }} className={styles.form_input_text_container}>
      <input
        className={`${styles.input_container} ${
          hasError ? styles.input_container_error : ''
        }`}
        {...otherprops}
      />

      <div className={styles.label_container}>
        <label className={styles.label_text}>{label}</label>
        {required && <span className={styles.required}>*</span>}
      </div>
      {showValidationRuleContainer && (
        <div className={styles.validation_rule_container}>
          <p className={styles.validation_rule_text}>{validationMessage}</p>
        </div>
      )}
      {info && (
        <span
          onClick={handleShowValidationRuleContainer}
          className={styles.info_icon_container}
        >
          <AiOutlineInfoCircle color="#08090a" size={10} />
        </span>
      )}
    </div>
  );
};

export default FormInputText;
