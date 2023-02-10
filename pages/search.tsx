import React, { useState, ChangeEvent } from 'react';
import styles from '../styles/Search.module.scss';
import SearchBox from '../components/search-box.component';
import useRequest from '../hooks/use-request';
import { BACKEND_URL } from './_app';
import BookDetailsSearch from '../components/book-details-search/book-details-search. component';
export const Genre = [
  'biography',
  'personality development',
  'comics',
  'horror',
  'fiction',
  'novel',
] as const;
type Author = {
  id: string;
  name: string;
};

export type Book = {
  id: string;
  name: string;
  dateOfRelease: string;
  about: string;
  userId: string;
  authors: Author[];
  publisher: Author;
  views: number;
  likes: string[];
  dislikes: string[];
  genre: typeof Genre[number];
  createdAt: string;
};

export const INITIAL_BOOK_DATA = {
  id: '',
  name: '',
  dateOfRelease: '',
  about: '',
  userId: '',
  authors: [],
  publisher: {
    id: '',
    name: '',
  },
  views: 0,
  likes: [],
  dislikes: [],
  genre: 'novel',
  createdAt: '',
};

const Search = () => {
  const [bookSearchField, setBookSearchField] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const { doRequest, errors } = useRequest({
    url: `${BACKEND_URL}/book/search/all`,
    body: { bookSearchField },
    method: 'post',
    onSuccess: (data) => {
      setBooks(data.books);
    },
  });
  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setBookSearchField(event.target.value);
    if (bookSearchField === '') {
      setBooks([]);
      return;
    }
    await doRequest();
  };

  return (
    <div className={styles.search_wrapper}>
      <div className={styles.search_container}>
        <div className={styles.search_box_container}>
          <SearchBox
            type="search"
            autoComplete="off"
            placeholder="search for books"
            onChange={handleChange}
          />
        </div>
        <div className={styles.book_search_results_container}>
          {books.length === 0 && bookSearchField !== '' && (
            <div>
              <h4>sorry, no books found</h4>
            </div>
          )}
          {books.map((book) => (
            <BookDetailsSearch key={book.id} {...book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
