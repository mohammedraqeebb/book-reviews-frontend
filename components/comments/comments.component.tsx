import React, { FC } from 'react';
import { CommentType } from '../../pages/book/[id]';
import styles from './Comments.module.scss';

type CommentsProps = {
  comments: CommentType[];
};

const Comments: FC<CommentsProps> = () => {
  return <div></div>;
};

export default Comments;
