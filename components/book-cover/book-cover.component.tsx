import Link from 'next/link';
import React, { FC } from 'react';
import { Genre } from '../../pages/search';
import styles from './BookCover.module.scss';
type Author = {
  id: string;
  name: string;
};

type BookCoverProps = {
  id: string;
  name: string;
  authors: Author[];
  genre: typeof Genre[number];
};

const BookCover: FC<BookCoverProps> = ({ id, genre, name, authors }) => {
  return (
    <Link href="/book/[id]" as={`/book/${id}`}>
      <div
        className={`${styles.book_cover_wrapper} book_${genre
          .split(' ')
          .join('_')}`}
      >
        <div className={styles.book_cover_container}>
          <h4 className={styles.book_name}>{name}</h4>
          <div className={styles.book_authors_container}>
            {authors.map((author) => (
              <h5 key={author.id} className={styles.book_author_name}>
                {author.name}
              </h5>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCover;
