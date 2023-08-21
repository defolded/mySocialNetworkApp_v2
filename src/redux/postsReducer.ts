import { InferActionsTypes } from "./redux-store";

export interface PostType {
  id: number;
  profilePicture: string | undefined;
  username: string;
  message: string;
}

let initialState = {
  posts: [
    {
      id: 1,
      profilePicture:
        "https://wow.zamimg.com/uploads/screenshots/normal/856222-wrathscale-naga.jpg",
      username: "Davos",
      message: "Give me back my fingers!",
    },
    {
      id: 2,
      profilePicture:
        "https://cdn.vox-cdn.com/thumbor/ylUiqp7B7CF9KB7JVwyCHJjU8DQ=/98x0:1168x713/1400x788/filters:focal(98x0:1168x713):format(png)/cdn.vox-cdn.com/uploads/chorus_image/image/49747471/Screen_Shot_2016-06-01_at_10.43.06_AM.0.0.png",
      username: "Tommen",
      message: "I want my Kingdom and Myrcella!",
    },
    {
      id: 3,
      profilePicture: "https://www.greekboston.com/wp-content/uploads/2017/12/Socrates.jpg",
      username: "Doran",
      message: "Let me think...",
    },
    {
      id: 4,
      profilePicture:
        "https://media.vanityfair.com/photos/57a235c682b926ca1e593883/master/w_2560%2Cc_limit/joker-evolution-ss04.jpg",
      username: "TestTestTest",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis nisi et arcu scelerisque lobortis. Nam non leo vitae massa ultrices viverra ut eu nibh. Nulla ullamcorper consequat metus, sit amet finibus sapien porttitor non. Phasellus at urna egestas, posuere ligula aliquet, feugiat nibh. Vestibulum commodo vitae quam ac tincidunt. Nulla scelerisque, est eget condimentum congue, est magna elementum risus, non hendrerit nunc magna id neque. Curabitur elementum sed justo nec ullamcorper. Cras malesuada sapien imperdiet orci hendrerit, eget molestie turpis blandit. Donec dignissim arcu non tellus venenatis lacinia. Suspendisse dictum tristique porta. Suspendisse in sapien at dolor rhoncus feugiat sit amet in dolor. Vestibulum odio elit, aliquet sed quam eget, dapibus auctor erat. Morbi eu ipsum ut nisl sagittis lacinia vitae eget erat. Etiam at ante ut quam vestibulum auctor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis tristique vel quam in condimentum. In hac habitasse platea dictumst. Donec ligula lectus, venenatis et ipsum eget, mattis feugiat turpis. Maecenas sapien arcu, aliquet ut arcu sed, laoreet convallis velit. Nam a tempor diam. Integer suscipit tortor vel pretium placerat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam cursus bibendum posuere. Suspendisse congue mi tristique facilisis accumsan. Fusce ut fermentum elit, eget tristique nisl. Aliquam erat volutpat. Vestibulum a eros lectus. Ut pretium enim ante, sit amet pellentesque justo tempor porttitor. Vivamus dui urna, vehicula in condimentum vel, ultrices non metus. Etiam pretium dolor tristique neque aliquet, ac elementum diam ultrices. Cras posuere lectus eget tortor vestibulum, sed pellentesque dolor tristique. Curabitur feugiat quam dolor, a interdum tellus luctus lacinia. Vestibulum finibus lacus nec tincidunt maximus. Sed in ligula ante. Praesent mattis pharetra urna, vel faucibus tortor molestie in. Duis non ipsum quis enim volutpat gravida. Sed neque nisi, ornare sit amet cursus ut, blandit nec risus. Sed interdum sodales imperdiet. Praesent ac erat sit amet lorem laoreet sodales sed in orci. Nulla feugiat tincidunt ligula eu convallis. Nulla feugiat tincidunt ligula eu convallis. Proin turpis lacus, commodo in porttitor eget, bibendum id lectus.",
    },
  ] as PostType[],
};

type InitialStateType = typeof initialState;
type ActionTypes = InferActionsTypes<typeof actions>;

const postsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case "SN/MESSAGES/ADD-POST": {
      let newPost = {
        id: state.posts[state.posts.length - 1].id + 1,
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Terminator-2-judgement-day.jpg/220px-Terminator-2-judgement-day.jpg",
        username: "add hoc to show username",
        message: action.text,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    }
    default:
      return state;
  }
};

export const actions = {
  addPost: (text: string) => ({ type: "SN/MESSAGES/ADD-POST", text } as const),
};

export default postsReducer;
