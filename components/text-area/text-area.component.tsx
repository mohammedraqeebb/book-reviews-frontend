import React, {
  FC,
  InputHTMLAttributes,
  useState,
  MouseEvent,
  useEffect,
} from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import styles from './TextAreaInput.module.scss';

type TextAreaProps = {
  label: string;
  required: boolean;
  info?: boolean;
  validationMessage?: string;
} & InputHTMLAttributes<HTMLTextAreaElement>;

const TextAreaInput: FC<TextAreaProps> = ({
  label,
  required,
  info,
  validationMessage,
  ...props
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
    <div className={styles.text_area_container}>
      <textarea {...props} className={styles.text_area_input}></textarea>
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

export default TextAreaInput;
