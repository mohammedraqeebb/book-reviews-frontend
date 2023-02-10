import React, { FC } from 'react';
import { Book } from '../../pages/search';
import SavedBook from '../saved-book/saved-book.component';
import styles from './SavedBookList.module.scss';
type SavedBookListProps = {
  books: Book[];
};

const SavedBooksList: FC<SavedBookListProps> = ({ books }) => {
  return (
    <div className={styles.saved_books_list_container}>
      {books.length === 0 && <h5>your saved books list is empty</h5>}
      {books.length > 0 &&
        books.map((currentBook) => (
          <SavedBook key={currentBook.id} {...currentBook} />
        ))}
    </div>
  );
};

export default SavedBooksList;
