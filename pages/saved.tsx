import axios from 'axios';
import { NextPage, NextPageContext } from 'next';
import React, { useEffect, useState } from 'react';
import buildClient from '../util/build-client';
import BookDetailsSearch from '../components/book-details-search/book-details-search. component';
import SavedBooksList from '../components/saved-books-list/saved-books-list.component';
import useRequest from '../hooks/use-request';
import { Book } from './search';
import { BACKEND_URL } from './_app';
import styles from '../styles/Saved.module.scss';
import PageSkeleton from '../components/page-skeleton.component';

type SavedPageProps = {
  savedBooks: Book[];
};

const Saved: NextPage = () => {
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const {
    doRequest: getAllSavedBooksRequest,
    errors: getAllSavedBooksRequestErrors,
  } = useRequest({
    url: `${BACKEND_URL}/book/saved/all`,
    method: 'post',
    body: {},
    onSuccess: (data) => {
      setSavedBooks(data.savedBooks);
    },
  });
  useEffect(() => {
    const fetchSavedBooks = async () => {
      await getAllSavedBooksRequest();
      setPageLoading(false);
    };
    fetchSavedBooks();
  }, []);

  if (pageLoading) {
    return (
      <div className={styles.saved_page_wrapper}>
        <div className={styles.saved_page_container}>
          <PageSkeleton />
        </div>
      </div>
    );
  }
  return (
    <div className={styles.saved_page_wrapper}>
      <div className={styles.saved_page_container}>
        <h3>Saved Books</h3>
        <SavedBooksList books={savedBooks} />
      </div>
    </div>
  );
};

export default Saved;

// export const getServerSideProps = async (context: NextPageContext) => {
//   const client = buildClient(context);
//   const { data } = await client.post(`${BACKEND_URL}/book/saved/all`);
//   return {
//     props: {
//       savedBooks: data.savedBooks,
//     },
//   };
// };
