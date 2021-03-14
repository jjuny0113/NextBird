export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "제로초",
      },
      content: "첫 번째 게시글 #해시태그 #익스프레스",
      Images: [
        {
          src:
            "https://cdn.pixabay.com/photo/2014/05/03/00/56/summerfield-336672_1280.jpg",
        },
        {
          src:
            "https://cdn.pixabay.com/photo/2016/10/27/13/22/girl-1775035__480.jpg",
        },
        {
          src:
            "https://cdn.pixabay.com/photo/2015/01/07/15/51/woman-591576_1280.jpg",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "nero",
          },
          content: "와 이쁘닷",
        },
      ],
    },
  ],
  imagePaths: [],

  postAddLoading: false,
  postAddDone: false,
  postAddError: null,

  postCommentLoading: false,
  postCommentDone: false,
  postCommentError: null,
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SCCUESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SCCUESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = {
  id: 2,
  content: "더미데이터입니다.",
  User: {
    id: 1,
    nickname: "제로초",
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        postAddLoading: true,
        postAddDone: false,
        postAddError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        postAddLoading: false,
        postAddDone: true,
        mainPosts: [dummyPost, ...state.mainPosts],
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        postAddLoading: false,
        postAddError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        postCommentLoading: true,
        postCommentDone: false,
        postCommentError: null,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        postCommentLoading: false,
        postCommentDone: true,
        Comments: action.data,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        postCommentLoading: false,
        postCommentError: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
