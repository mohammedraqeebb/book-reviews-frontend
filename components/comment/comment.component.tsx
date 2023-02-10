import React, { FC, FormEvent, useState } from 'react';
import { CommentType } from '../../pages/book/[id]';
import { timeSince } from '../../util/validation/time-passed';
import styles from './Comment.module.scss';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { BACKEND_URL } from '../../pages/_app';
import useRequest from '../../hooks/use-request';
import { useAppSelector } from '../../app/hooks';
import { AiFillRightCircle } from 'react-icons/ai';

type User = {
  id: string;
  name: string;
};
type CommentProps = {
  id: string;
  bookId: string;
  updatedAt: string;
  comment: string;
  commentor: User;
  // setCommentsData: React.Dispatch<React.SetStateAction<CommentType[]>>;
  setExecuteFetchComments: React.Dispatch<React.SetStateAction<boolean>>;
};

const Comment: FC<CommentProps> = ({
  id,
  commentor,
  updatedAt,
  comment,
  bookId,
  setExecuteFetchComments,
}) => {
  const user = useAppSelector((state) => state.user.user);
  const [showEditForm, setShowEditForm] = useState(false);
  const [commentText, setCommentText] = useState(comment);
  const isCommentor = user && commentor.id.toString() === user.id;

  const { doRequest: editCommentRequest, errors: editCommentRequestErrors } =
    useRequest({
      url: `${BACKEND_URL}/book/comment/${bookId}/${id}/edit`,
      method: 'put',
      body: { comment: commentText },
      onSuccess: (data) => {
        setExecuteFetchComments((value) => !value);
        setShowEditForm(false);
      },
    });
  const {
    doRequest: deleteCommentRequest,
    errors: deleteCommentRequestErrors,
  } = useRequest({
    url: `${BACKEND_URL}/book/comment/${bookId}/${id}/delete`,
    method: 'post',
    body: {},
    onSuccess: (data) => {
      setExecuteFetchComments((value) => !value);
    },
  });

  const handleEditCommentSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await editCommentRequest();
  };
  return (
    <div className={styles.comment_container}>
      <div className={styles.comment_first_row}>
        <div className={styles.logo_and_name_time_container}>
          <div className={styles.comment_name_logo}>
            <p>
              {commentor.name
                .split(' ')
                .map((word) => word[0])
                .slice(0, 2)
                .join('')}
            </p>
          </div>
          <p className={styles.commentor_name}>{commentor.name}</p>
          <p className={styles.comment_time}>{timeSince(updatedAt)}</p>
        </div>
        {isCommentor && (
          <div className={styles.icons}>
            <FiEdit size={16} onClick={() => setShowEditForm(!showEditForm)} />
            <FiTrash size={16} onClick={() => deleteCommentRequest()} />
          </div>
        )}
      </div>
      <div className={styles.comment_second_row}>
        {!showEditForm && <p className={styles.comment_text}>{comment}</p>}
        {showEditForm && (
          <form
            onSubmit={handleEditCommentSubmit}
            className={styles.comment_input_container}
          >
            <textarea
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
            />
            <button
              onClick={handleEditCommentSubmit}
              disabled={comment.length === 0}
            >
              <AiFillRightCircle
                color={comment.length === 0 ? '#b4b8bc' : '#08090a'}
                size={24}
              />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Comment;
