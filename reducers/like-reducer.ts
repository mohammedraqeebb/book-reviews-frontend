export const likeReducerActions = [
  'ADD_LIKE',
  'REMOVE_LIKE',
  'ADD_DISLIKE',
  'REMOVE_DISLIKE',
  'SET_LIKE_STATE',
] as const;

type LikeReducerState = {
  liked: boolean;
  numberOfLikes: number;
  disliked: boolean;
  numberOfDislikes: number;
};
type likeReducerAction = {
  type: typeof likeReducerActions[number];
  payload?: LikeReducerState | null;
};

export const likeReducer = (
  state: LikeReducerState,
  action: likeReducerAction
) => {
  switch (action.type) {
    case 'ADD_LIKE':
      if (state.disliked) {
        return {
          liked: true,
          disliked: false,
          numberOfLikes: state.numberOfLikes + 1,
          numberOfDislikes: state.numberOfDislikes - 1,
        };
      } else {
        return {
          liked: true,
          disliked: false,
          numberOfLikes: state.numberOfLikes + 1,
          numberOfDislikes: state.numberOfDislikes,
        };
      }
    case 'REMOVE_LIKE':
      return {
        liked: false,
        disliked: false,
        numberOfLikes: state.numberOfLikes - 1,
        numberOfDislikes: state.numberOfDislikes,
      };
    case 'ADD_DISLIKE':
      if (state.liked) {
        return {
          liked: false,
          disliked: true,
          numberOfLikes: state.numberOfLikes - 1,
          numberOfDislikes: state.numberOfDislikes + 1,
        };
      } else {
        return {
          liked: false,
          disliked: true,
          numberOfLikes: state.numberOfLikes,
          numberOfDislikes: state.numberOfDislikes + 1,
        };
      }
    case 'REMOVE_DISLIKE':
      return {
        liked: false,
        disliked: false,
        numberOfLikes: state.numberOfLikes,
        numberOfDislikes: state.numberOfDislikes - 1,
      };
    case 'SET_LIKE_STATE':
      return action.payload ?? INITIAL_LIKE_STATE;
  }
};

export const INITIAL_LIKE_STATE: LikeReducerState = {
  liked: false,
  numberOfLikes: 0,
  disliked: false,
  numberOfDislikes: 0,
};
