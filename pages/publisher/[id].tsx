import axios from 'axios';
import { NextPage, NextPageContext } from 'next';
import React from 'react';
import BookDetailsSearch from '../../components/book-details-search/book-details-search. component';
import { Book } from '../search';
import { BACKEND_URL } from '../_app';
import styles from '../../styles/PublisherDetails.module.scss';
import { convertToWordedDate } from '../../util/convert-to-worded-date';
import { GrLocationPin } from 'react-icons/gr';

type PublisherDetailsProps = {
  id: string;
  name: string;
  userId: string;
  bio: string;
  street: string;
  state: string;
  establishedDate: string;
  countryCode: string;
  country: string;
  phoneNumber: string;
  books: Book[];
};

const PublisherDetails: NextPage<PublisherDetailsProps> = ({
  name,
  id,
  userId,
  bio,
  street,
  state,
  establishedDate,
  country,
  countryCode,
  phoneNumber,
  books,
}) => {
  return (
    <div className={styles.publisher_page_wrapper}>
      <div className={styles.publisher_page_container}>
        <div className={styles.publisher_details_container}>
          <div className={styles.publisher_logo}>
            <h1>
              {name
                .split(' ')
                .map((word) => word[0])
                .slice(0, 2)
                .join('')
                .toLocaleUpperCase()}
            </h1>
          </div>
          <div className={styles.publisher_details}>
            <h3 className={styles.publisher_name}>{name}</h3>
            <h6 className={styles.publisher_date}>
              since {convertToWordedDate(establishedDate.substring(0, 14))}
            </h6>
            <p className={styles.publisher_bio}>{bio}</p>
            <div className={styles.publisher_address}>
              <p className={styles.publisher_address_header}>
                <GrLocationPin size={14} style={{ margin: '0 auto' }} />
                Address
              </p>
              <div>
                <p className={styles.publisher_street}>{street}</p>
                <div className={styles.publisher_state_and_coutry}>
                  <p className={styles.publisher_state}>{state} </p>
                  <p className={styles.publisher_country}>{country}</p>
                </div>
              </div>

              <p className={styles.publisher_phone_number}>
                {countryCode} {phoneNumber}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.books_container}>
          <h4>Published Books</h4>
          {books.length === 0 && (
            <h6>the company has not published any books yet</h6>
          )}
          {books.length >= 0 &&
            books.map((currentBook) => (
              <BookDetailsSearch key={currentBook.id} {...currentBook} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PublisherDetails;

export const getServerSideProps = async (context: NextPageContext) => {
  const publisherId = context.query.id;

  const { data } = await axios.get(`${BACKEND_URL}/publisher/${publisherId}`);
  return {
    props: {
      ...data.publisher,
    },
  };
};
