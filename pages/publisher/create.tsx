import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import Button from '../../components/button/button.component';
import DropdownSelect, {
  SelectOption,
} from '../../components/dropdown-select/dropdown-select.component';
import ErrorComponent from '../../components/error.component';
import FormInputText from '../../components/form-input-text.tsx/form-input-text.component';
import TextAreaInput from '../../components/text-area/text-area.component';
import useRequest from '../../hooks/use-request';
import styles from '../../styles/CreatePublisher.module.scss';
import { getToday } from '../../util/validation/get-today';
import { BACKEND_URL } from '../_app';

const INITAL_PUBLISHER_FORM_FIELDS = {
  name: '',
  establishedDate: '',
  bio: '',
  street: '',
  state: '',
  country: '',
  countryCode: '',
  phoneNumber: '',
};
const INITAL_PUBLISHER_FORM_FIELDS_ERRORS = {
  name: false,
  establishedDate: false,
  bio: false,
  street: false,
  state: false,
  country: false,
  countryCode: false,
  phoneNumber: false,
};
type Gender = 'male' | 'female';

type Publisher = {
  name: string;
  bio: string;
  street: string;
  state: string;
  establishedDate: string;
  country: string;
  countryCode: string;
  phoneNumber: string;
};

const CreatePublisher = () => {
  const [publisherFormFields, setPublisherFormFields] = useState(
    INITAL_PUBLISHER_FORM_FIELDS
  );
  const [publisherFormFieldsErrors, setPublisherFormFieldsErrors] = useState(
    INITAL_PUBLISHER_FORM_FIELDS_ERRORS
  );
  const router = useRouter();

  const handleFormInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setPublisherFormFields({ ...publisherFormFields, [name]: value });
  };

  const { doRequest, errors } = useRequest<Publisher>({
    url: `${BACKEND_URL}/publisher/create`,
    method: 'post',
    authenticated: true,
    body: { ...publisherFormFields },
    onSuccess: (data) => {
      const { publisher } = data;
      router.push(`/publisher/${publisher.id}`);
    },
  });
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    doRequest();
  };

  const {
    name,
    establishedDate,
    bio,
    country,
    countryCode,
    state,
    street,
    phoneNumber,
  } = publisherFormFields;
  return (
    <div className={styles.create_author_wrapper}>
      <div className={styles.create_author_form_wrapper}>
        <form onSubmit={handleSubmit} className={styles.form_container}>
          <h4>create publisher form</h4>
          <FormInputText
            autoComplete="off"
            type="text"
            label="Name"
            name="name"
            hasError={publisherFormFieldsErrors.name}
            value={name}
            onChange={handleFormInputChange}
            placeholder="harper collins"
            required={true}
            info
            validationMessage="atleast 10 alphabets"
          />
          <FormInputText
            autoComplete="off"
            type="date"
            hasError={publisherFormFieldsErrors.establishedDate}
            max={getToday()}
            label="When was the company created?"
            name="establishedDate"
            value={establishedDate}
            onChange={handleFormInputChange}
            required={true}
          />
          <TextAreaInput
            autoComplete="off"
            label="Company Bio"
            value={bio}
            name="bio"
            info
            validationMessage="bio should be atleast 50 characters and atmost 1000 characters"
            placeholder="write your companies achievements"
            onChange={handleFormInputChange}
            required
          />
          <div className={styles.phone_number_container}>
            <span className={styles.country_code_container}>
              <FormInputText
                autoComplete="off"
                hasError={publisherFormFieldsErrors.countryCode}
                label="Country code"
                value={countryCode}
                name="countryCode"
                type="tel"
                placeholder="+91"
                onChange={handleFormInputChange}
                required
              />
            </span>
            <span className={styles.phone_number_container}>
              <FormInputText
                autoComplete="off"
                type="tel"
                hasError={publisherFormFieldsErrors.phoneNumber}
                label="Phone number"
                inputMode="numeric"
                value={phoneNumber}
                name="phoneNumber"
                placeholder="99999999999"
                onChange={handleFormInputChange}
                required
              />
            </span>
          </div>
          <h5>Address</h5>
          <FormInputText
            autoComplete="off"
            type="text"
            label="Street"
            hasError={publisherFormFieldsErrors.street}
            value={street}
            name="street"
            placeholder="21/12, Burj Al Arab"
            onChange={handleFormInputChange}
            required
          />
          <div className={styles.state_and_country_container}>
            <span className={styles.state_container}>
              <FormInputText
                autoComplete="off"
                type="text"
                label="State"
                value={state}
                name="state"
                hasError={publisherFormFieldsErrors.state}
                placeholder="Abu Dhabi"
                onChange={handleFormInputChange}
                required
              />
            </span>
            <span className={styles.country_container}>
              <FormInputText
                autoComplete="off"
                type="text"
                label="Country"
                hasError={publisherFormFieldsErrors.country}
                value={country}
                name="country"
                placeholder="UAE"
                onChange={handleFormInputChange}
                required
              />
            </span>
          </div>
          {errors && <ErrorComponent errors={errors} />}
          <Button type="submit" onClick={handleSubmit} width="100%">
            create publisher page
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePublisher;
