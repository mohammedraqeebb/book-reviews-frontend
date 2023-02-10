import React, { useEffect } from 'react';

const useEnterSubmitForm = () => {
  useEffect(() => {
    const textArea = document.querySelector('textarea');
    const form = document.querySelector('form');

    const handleTextAreaSubmit = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        form?.submit();
      }
    };

    const textAreaFormSubmit = (event: SubmitEvent) => {
      event.preventDefault();
    };

    textArea?.addEventListener('keydown', handleTextAreaSubmit);

    form?.addEventListener('submit', textAreaFormSubmit);
    return () => {
      textArea?.removeEventListener('keydown', handleTextAreaSubmit);
      form?.removeEventListener('submit', textAreaFormSubmit);
    };
  }, []);
};

export default useEnterSubmitForm;
