import Link from 'next/link';
import React, { FC, useState, MouseEvent } from 'react';
import useRequest from '../../hooks/use-request';
import { Book } from '../../pages/search';
import { BACKEND_URL } from '../../pages/_app';
import SavedActiveIcon from '../../static/assets/icons/saved-active.icon';
import SavedIcon from '../../static/assets/icons/saved.icon';
import { convertToWordedDate } from '../../util/convert-to-worded-date';
import styles from './SavedBook.module.scss';

const SavedBook: FC<Book> = ({
  id,
  name,
  dateOfRelease,
  genre,
  authors,
  publisher,
}) => {
  const [isBookSaved, setIsBookSaved] = useState(true);
  const handleSave = async (event: MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsBookSaved(true);
    await addBookToSavedListRequest();
  };
  const handleUnsave = async (event: MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsBookSaved(false);
    await deleteBookFromSavedListRequest();
  };
  const {
    doRequest: addBookToSavedListRequest,
    errors: addBookToSavedListRequestErrors,
  } = useRequest({
    url: `${BACKEND_URL}/book/saved/${id}/create`,
    method: 'post',
    authenticated: true,
    onSuccess: () => {},
  });
  const {
    doRequest: deleteBookFromSavedListRequest,
    errors: deleteBookFromSavedListRequestErrors,
  } = useRequest({
    url: `${BACKEND_URL}/book/saved/${id}/delete`,
    method: 'post',
    authenticated: true,
    onSuccess: () => {},
  });
  return (
    <Link
      href="/book/[id]"
      as={`/book/${id}`}
      className={styles.book_details_container}
    >
      <div
        className={`${styles.book_cover} book_${genre.split(' ').join('_')}`}
      >
        <h6 className={styles.book_name}>{name}</h6>
        <h6 className={styles.book_author}>{authors[0].name}</h6>
      </div>
      <div className={styles.book_details}>
        <div className={styles.name_and_icon_container}>
          <h4 className={styles.book_name_right}>{name}</h4>
          <span className={styles.saved_icon}>
            {!isBookSaved ? (
              <span onClick={handleSave}>
                <SavedIcon height="16" width="15" color="black" />
              </span>
            ) : (
              <span onClick={handleUnsave}>
                <SavedActiveIcon height="16" width="15" color="black" />
              </span>
            )}
          </span>
        </div>
        <p className={styles.book_publisher}>{publisher.name}</p>
        <p className={styles.book_date}>
          {convertToWordedDate(dateOfRelease.slice(0, 13))}
        </p>
        <p className={styles.book_genre}>{genre}</p>
      </div>
    </Link>
  );
};

export default SavedBook;
