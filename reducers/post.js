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
  postAdded: false,
};

const ADD_POST = "ADD_POST";
export const addPost = {
  type: ADD_POST,
};

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
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };

    default:
      return state;
  }
};

export default reducer;
