import axios from 'axios';
import { NextPage, NextPageContext } from 'next';
import React, {
  useState,
  MouseEvent,
  useEffect,
  FormEvent,
  useCallback,
  useReducer,
} from 'react';
import { Book, INITIAL_BOOK_DATA } from '../search';
import { BACKEND_URL } from '../_app';
import styles from '../../styles/BookDetails.module.scss';
import Link from 'next/link';
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
  AiFillEye,
  AiFillRightCircle,
  AiFillStar,
} from 'react-icons/ai';
import { GrLinkUp } from 'react-icons/gr';
import { style } from '@mui/system';
import { convertToWordedDate } from '../../util/convert-to-worded-date';
import CommentType from '../../components/comment/comment.component';
import Comment from '../../components/comment/comment.component';
import useRequest from '../../hooks/use-request';
import { useAppSelector } from '../../app/hooks';
import { UserState } from '../../features/user/user-slice';
import { roundOffNumber } from '../../util/round-off-number';
import SavedIcon from '../../static/assets/icons/saved.icon';
import SavedActiveIcon from '../../static/assets/icons/saved-active.icon';
import useEnterSubmitForm from '../../hooks/use-enter-submit-form';
import { INITIAL_LIKE_STATE, likeReducer } from '../../reducers/like-reducer';
import { Skeleton } from '@mui/material';
import PageSkeleton from '../../components/page-skeleton.component';

//@ts-ignore
type User = {
  id: string;
  name: string;
};
export type CommentType = {
  id: string;
  bookId: string;
  comment: string;
  commentor: User;
  updatedAt: string;
};
type BookDetailsProps = {
  id: string;
};
type RouterQuery = {
  id: string;
};

type BookDetailsResponseBodyType = {
  book: Book;
};
type FetchCommentsResponseBodyType = {
  comments: CommentType[];
};

type CurrentUserResponseBodyType = {
  user: User | null;
};
type UserSavedBooksResponseBodyType = {
  savedBooks: Book[];
};

const BookDetails: NextPage<BookDetailsProps> = ({ id }) => {
  const [book, setBook] = useState<Book | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [bookPageLoading, setBookPageLoading] = useState(false);
  const [userRequestLoading, setUserRequestLoading] = useState(true);
  const [likeState, dispatch] = useReducer(likeReducer, INITIAL_LIKE_STATE);
  const [user, setUser] = useState<UserState | null>(null);
  const [isBookSaved, setIsBookSaved] = useState(false);
  const [executeFetchComments, setExecuteFetchComments] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [comment, setcomment] = useState('');

  const {
    doRequest: fetchCommentsRequest,
    errors: fetchCommentsRequestErrors,
  } = useRequest({
    url: `${BACKEND_URL}/book/comment/${id}/all`,
    method: 'post',
    onSuccess: (data) => {
      setComments(data.comments);
    },
  });

  const {
    doRequest: fetchCommentsRequestOnMount,
    errors: fetchCommentsRequestOnMountErrors,
  } = useRequest<FetchCommentsResponseBodyType>({
    url: `${BACKEND_URL}/book/comment/${id}/all`,
    method: 'post',
    onSuccess: () => {},
  });

  const { doRequest: bookDetailsRequest, errors: bookDetailsRequestErrors } =
    useRequest<BookDetailsResponseBodyType>({
      url: `${BACKEND_URL}/book/${id}`,
      method: 'get',
      onSuccess: () => {},
    });

  const {
    doRequest: userSavedBooksRequest,
    errors: userSavedBooksRequestErrors,
  } = useRequest<UserSavedBooksResponseBodyType>({
    url: `${BACKEND_URL}/book/saved/all`,
    method: 'post',
    onSuccess: () => {},
  });

  const { doRequest: currentUserRequest, errors: currentUserRequestErrors } =
    useRequest<CurrentUserResponseBodyType>({
      url: `${BACKEND_URL}/auth/currentuser`,
      method: 'post',
      onSuccess: () => {},
    });

  const loadInitialData = async () => {
    const [bookData, commentData, userData] = await Promise.all([
      bookDetailsRequest(),
      fetchCommentsRequestOnMount(),
      currentUserRequest(),
    ]);
    if (!bookData || !commentData || !userData) {
      return;
    }
    setBook(bookData.book);
    setComments(commentData.comments);
    setUser(userData!.user);
    setBookPageLoading(false);
    const hasuserLiked = !userData.user
      ? false
      : bookData.book.likes.includes(userData.user.id)
      ? true
      : false;

    const hasUserDisliked = !userData.user
      ? false
      : bookData.book.dislikes.includes(userData.user.id)
      ? true
      : false;
    if (!userData.user) {
      setUserRequestLoading(false);
    } else if (userData.user) {
      const savedBooksData = await userSavedBooksRequest();
      setIsBookSaved(
        savedBooksData?.savedBooks.find(
          (currentBook: Book) => currentBook.id === id
        )
          ? true
          : false
      );
      setUserRequestLoading(false);
    }

    dispatch({
      type: 'SET_LIKE_STATE',
      payload: {
        liked: hasuserLiked,
        numberOfLikes: bookData.book.likes.length,
        disliked: hasUserDisliked,
        numberOfDislikes: bookData.book.dislikes.length,
      },
    });
  };
  useEffect(() => {
    loadInitialData();
  }, []);

  useEnterSubmitForm();
  useEffect(() => {
    if (!book) {
      return;
    }
    fetchCommentsRequest();
  }, [executeFetchComments]);

  const { doRequest: addLikeRequest, errors: addLikeErrors } = useRequest({
    url: `${BACKEND_URL}/book/${id}/like/add`,
    method: 'post',
    authenticated: true,
    onSuccess: () => {},
  });
  const { doRequest: removeLikeRequest, errors: removeLikeErrors } = useRequest(
    {
      url: `${BACKEND_URL}/book/${id}/like/remove`,
      method: 'post',
      authenticated: true,
      onSuccess: () => {},
    }
  );
  const { doRequest: addDislikeRequest, errors: addLikeRequestErrors } =
    useRequest({
      url: `${BACKEND_URL}/book/${id}/dislike/add`,
      method: 'post',
      authenticated: true,
      onSuccess: () => {},
    });
  const {
    doRequest: removeDislikeRequest,
    errors: removeDislikeRequestErrors,
  } = useRequest({
    url: `${BACKEND_URL}/book/${id}/dislike/remove`,
    method: 'post',
    authenticated: true,
    onSuccess: () => {},
  });
  const clickLikeEvent = async (event: MouseEvent) => {
    event.stopPropagation();
    await addLikeRequest();
    if (user) {
      dispatch({ type: 'ADD_LIKE' });
    }
  };
  const removeLikeEvent = async (event: MouseEvent) => {
    event.stopPropagation();
    await removeLikeRequest();
    if (user) {
      dispatch({ type: 'REMOVE_LIKE' });
    }
  };
  const clickDislikeEvent = async (event: MouseEvent) => {
    event.stopPropagation();

    await addDislikeRequest();
    if (user) {
      dispatch({ type: 'ADD_DISLIKE' });
    }
  };
  const removeDislikeEvent = async (event: MouseEvent) => {
    event.stopPropagation();

    await removeDislikeRequest();
    if (user) {
      dispatch({ type: 'REMOVE_DISLIKE' });
    }
  };

  const { doRequest: addCommentRequest, errors: addCommentRequestErrors } =
    useRequest({
      url: `${BACKEND_URL}/book/comment/${id}/create`,
      method: 'post',
      body: { comment },
      authenticated: true,
      onSuccess: (data) => {
        setExecuteFetchComments((value) => !value);
        setcomment('');
      },
    });
  const handleCommentSubmit = async (event: FormEvent) => {

    event.preventDefault();
    event.stopPropagation();
    await addCommentRequest();
  };

  const { doRequest: addViewRequest, errors: addViewRequestErrors } =
    useRequest({
      url: `${BACKEND_URL}/book/${id}/view`,
      method: 'post',
      onSuccess: () => {},
    });

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

  const handleSave = async (event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    if (user) {
      setIsBookSaved(true);
    }
    await addBookToSavedListRequest();
  };
  const handleUnsave = async (event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    if (user) {
      setIsBookSaved(false);
    }
    await deleteBookFromSavedListRequest();
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      addViewRequest();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  if (!book || !comments || bookPageLoading || userRequestLoading) {
    return (
      <div className={styles.book_view_page_wrapper}>
        <div className={styles.book_view_page}>
          <PageSkeleton />
        </div>
      </div>
    );
  }

  const {
    name,
    genre,
    authors,
    publisher,
    dateOfRelease,
    likes,
    dislikes,
    views,
    about,
    createdAt,
  } = book;

  return (
    <div className={styles.book_view_page_wrapper}>
      <div className={styles.book_view_page}>
        <div className={styles.book_details_section}>
          <div
            className={`${styles.book_cover} book_${genre
              .split(' ')
              .join('_')}`}
          >
            <h4 className={styles.book_name}>{name}</h4>
            <h5 className={styles.book_author}>{authors[0].name}</h5>
          </div>
          <div className={styles.book_info}>
            <div className={styles.name_and_icon_container}>
              <h4 className={styles.book_name}>{name}</h4>
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

            <div className={styles.book_authors_container}>
              {authors.map((currentAuthor) => (
                <Link
                  className={styles.author_container}
                  key={currentAuthor.id}
                  href="/author/[id]"
                  as={`/author/${currentAuthor.id}`}
                >
                  <p>{currentAuthor.name}</p>
                  <span>
                    {' '}
                    <GrLinkUp size={12} className={styles.link_icon} />
                  </span>
                </Link>
              ))}
            </div>
            <Link
              className={styles.publisher_container}
              href="/publisher/[id]"
              as={`/publisher/${publisher.id}`}
            >
              <p> {publisher.name}</p>
              <span>
                {' '}
                <GrLinkUp
                  size={10}
                  style={{ transform: 'rotate(45deg)', margin: 'auto 0px' }}
                />
              </span>
            </Link>
            <p className={styles.genre}>{genre}</p>
            <p className={styles.date_of_release}>
              {convertToWordedDate(dateOfRelease)}
            </p>

            <div className={styles.user_reactions_container}>
              <span className={styles.view_container}>
                <AiFillEye size={20} />
                <p>{roundOffNumber(views)}</p>
              </span>
              <span className={styles.like_container}>
                {likeState.liked ? (
                  <AiFillLike onClick={removeLikeEvent} size={20} />
                ) : (
                  <AiOutlineLike onClick={clickLikeEvent} size={20} />
                )}
                <p>{roundOffNumber(likeState.numberOfLikes)}</p>
              </span>
              <span className={styles.dislike_container}>
                {likeState.disliked ? (
                  <AiFillDislike size={20} onClick={removeDislikeEvent} />
                ) : (
                  <AiOutlineDislike size={20} onClick={clickDislikeEvent} />
                )}
                <p>{roundOffNumber(likeState.numberOfDislikes)}</p>
              </span>
              <span className={styles.rating_container}>
                <AiFillStar size={20} />
                <p>10</p>
              </span>
            </div>
            <p className={styles.about_container}>{about}</p>
          </div>
        </div>
        <div className={styles.comments_section}>
          <form
            onSubmit={handleCommentSubmit}
            className={styles.comment_input_container}
          >
            <textarea
              draggable="false"
              placeholder="add a comment ..."
              value={comment}
              onChange={(e) => setcomment(e.target.value)}
            />
            <button
              onClick={handleCommentSubmit}
              disabled={comment.length === 0}
            >
              <AiFillRightCircle
                color={comment.length === 0 ? '#b4b8bc' : '#08090a'}
                size={24}
              />
            </button>
          </form>
          <div className={styles.comments_container}>
            {comments.map((currentComment) => (
              <Comment
                {...currentComment}
                // setCommentsData={setCommentsData}
                setExecuteFetchComments={setExecuteFetchComments}
                key={currentComment.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

export const getServerSideProps = async (context: NextPageContext) => {

  const id = context.query.id;
  // const [{ data: bookData }, { data: commentsData }, { data: ratingsData }] =
  //   await Promise.all([
  //     await axios.get(`${BACKEND_URL}/book/${bookid}`),
  //     await axios.get(`${BACKEND_URL}/book/comment/${bookid}/all`),
  //     await axios.get(`${BACKEND_URL}/book/rating/${bookid}/all`),
  //   ]);

  return {
    props: {
      id,
    },
  };
};
