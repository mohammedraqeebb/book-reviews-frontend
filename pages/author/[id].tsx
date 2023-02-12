import axios from 'axios';
import { NextPage, NextPageContext } from 'next';
import React from 'react';
import { Book } from '../search';
import { BACKEND_URL } from '../_app';
import styles from '../../styles/AuthorDetails.module.scss';
import BookDetailsSearch from '../../components/book-details-search/book-details-search. component';
import { convertToWordedDate } from '../../util/convert-to-worded-date';
import buildClient from '../../api/build-client';

type AuthorDetailsProps = {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  bio: string;
  userId: string;
  books: Book[];
};

const AuthorDetails: NextPage<AuthorDetailsProps> = ({
  id,
  name,
  dateOfBirth,
  bio,
  userId,
  books,
}) => {
  return (
    <div className={styles.author_page_wrapper}>
      <div className={styles.author_page_container}>
        <div className={styles.author_page_details_section}>
          <div className={styles.author_logo}>
            <h1>
              {name
                .split(' ')
                .map((word) => word[0])
                .slice(0, 2)
                .join('')
                .toLocaleUpperCase()}
            </h1>
          </div>
          <div className={styles.author_details}>
            <h3 className={styles.author_name}>{name}</h3>
            <h6 className={styles.author_date_of_birth}>
              born on {convertToWordedDate(dateOfBirth)}
            </h6>
            <p className={styles.author_bio}>{bio}</p>
          </div>
        </div>
        <div className={styles.books_container_section}>
          <h5 className={styles.books_container_header}>
            Authored/Co-Authored books
          </h5>
          <div className={styles.books_container}>
            {books.length === 0 && (
              <h6>
                the author has not written any books yet or the list id not
                updated here
              </h6>
            )}
            {books.map((currentBook) => (
              <BookDetailsSearch key={currentBook.id} {...currentBook} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetails;

export const getServerSideProps = async (context: NextPageContext) => {
  const authorId = context.query.id;
  const client = buildClient(context);

  const { data } = await client.get(`${BACKEND_URL}/author/${authorId}`);
  return {
    props: {
      ...data.author,
    },
  };
};
