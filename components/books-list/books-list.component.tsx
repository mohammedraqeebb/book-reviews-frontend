import React, { FC, useRef, TouchEvent, useState, MouseEvent } from 'react';
import { Book } from '../../pages/search';
import BookCover from '../book-cover/book-cover.component';
import styles from './BooksList.module.scss';
import useHorizontalMouseScroll from '../../hooks/use-horizontal-mouse-scroll';
type BooksListProps = {
  books: Book[];
  listTitle: string;
};

const BooksList: FC<BooksListProps> = ({ books, listTitle }) => {
  const containerRef = useHorizontalMouseScroll();

  return (
    <div className={styles.books_list_component}>
      <h3 className={styles.book_list_title}>{listTitle}</h3>
      <div ref={containerRef} className={styles.books_list_container}>
        {books && books.map((book) => <BookCover key={book.id} {...book} />)}
      </div>
    </div>
  );
};

export default BooksList;
