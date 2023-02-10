import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Button from '../../components/button/button.component';
import DropdownSelect, {
  SelectOption,
} from '../../components/dropdown-select/dropdown-select.component';
import ErrorComponent from '../../components/error.component';
import FormInputText from '../../components/form-input-text.tsx/form-input-text.component';
import TextAreaInput from '../../components/text-area/text-area.component';
import useRequest from '../../hooks/use-request';
import styles from '../../styles/CreateAuthor.module.scss';

import { BACKEND_URL } from '../_app';

const INITAL_AUTHOR_CREATE_FIELDS = {
  name: '',
  dateOfBirth: '',
  bio: '',
};
export type Gender = 'male' | 'female';

type Author = {
  name: string;
  dateOfBirth: string;
  bio: string;
  gender: Gender;
};

const CreateAuthor = () => {
  const genderOptions = [
    { id: 100, label: 'not selected', value: '' },
    { id: 1, label: 'male', value: 'male' },
    { id: 2, label: 'female', value: 'female' },
  ];
  const [gender, setGender] = useState<SelectOption | undefined>(
    genderOptions[0]
  );
  const router = useRouter();
  const [authorFormFields, setAuthorFormFields] = useState(
    INITAL_AUTHOR_CREATE_FIELDS
  );

  const FormInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAuthorFormFields({ ...authorFormFields, [name]: value });
  };

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setAuthorFormFields({ ...authorFormFields, [name]: value });

    switch (name) {
      case 'name':
    }
  };
  const { doRequest, errors } = useRequest<Author>({
    url: `${BACKEND_URL}/author/create`,
    method: 'post',
    body: { ...authorFormFields, gender: gender?.label },
    authenticated: true,
    onSuccess: (data) => {
      const { author } = data;
      router.push(`/author/${author.id}`);
    },
  });
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    doRequest();
  };
  const handleGenderChange = (option: SelectOption | undefined) => {
    setGender(option);
  };

  const { name, dateOfBirth, bio } = authorFormFields;
  return (
    <div className={styles.create_author_wrapper}>
      <div className={styles.create_author_form_wrapper}>
        <form onSubmit={handleSubmit} className={styles.form_container}>
          <h4>Create Author form</h4>
          <FormInputText
            autoComplete="off"
            type="text"
            label="Name"
            name="name"
            value={name}
            info
            validationMessage="name should be atleast three alphabets"
            onChange={FormInputChange}
            placeholder="Dale Carnegie"
            required={true}
          />
          <FormInputText
            autoComplete="off"
            type="date"
            max="2013-01-01"
            info
            validationMessage="select a valid date"
            label="Date Of Birth"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={FormInputChange}
            required={true}
          />
          <TextAreaInput
            autoComplete="off"
            label="Bio"
            info
            validationMessage="bio should be atleast 50 characters and maximum 1000 characters"
            value={bio}
            name="bio"
            placeholder="write your  achievements"
            onChange={handleTextAreaChange}
            required
          />
          <DropdownSelect
            label="Gender"
            required
            options={genderOptions}
            multiple={false}
            value={gender}
            onChange={handleGenderChange}
          />
          {errors && <ErrorComponent errors={errors} />}
          <Button type="submit" onClick={handleSubmit} width="100%">
            create author page
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateAuthor;
