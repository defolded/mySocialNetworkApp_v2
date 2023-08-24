import { Field, InjectedFormProps, reduxForm } from "redux-form";
import b from "../.././Button.module.css";
import { required } from "../../utils/validators";
import styles from "./MyPosts.module.css";
import MyPost from "./SinglePost/SinglePost";
import { PostType } from "../../redux/postsReducer";

interface MapStateToPropsType {
  posts: PostType[];
  isAuth: boolean;
}

interface MapDispatchToPropsType {
  addPost: (t: string) => void;
}

const MyPosts: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
  const addPost = (values: any) => props.addPost(values.newPostBody);

  return (
    <div className={styles.wrapper}>
      <div className={styles.postsList}>
        {props.posts.map((p) => (
          <MyPost
            profilePicture={p.profilePicture}
            username={p.username}
            text={p.message}
            key={crypto.randomUUID()}
          />
        ))}
      </div>
      {props.isAuth ? <AddPostReduxForm onSubmit={addPost} /> : ""}
    </div>
  );
};

type AddPostFormValuesType = {};

interface AddPostOwnPropsType {}

const AddPostForm: React.FC<
  InjectedFormProps<AddPostFormValuesType, AddPostOwnPropsType> & AddPostOwnPropsType
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={b.userInput}>
        <Field
          component="textarea"
          name="newPostBody"
          placeholder="Enter your post"
          validate={required}
          className={b.text}
        />
        <button className={b.btn}>Submit</button>
      </div>
    </form>
  );
};

const AddPostReduxForm = reduxForm<AddPostFormValuesType, AddPostOwnPropsType>({
  form: "postAddPostForm",
})(AddPostForm);

export default MyPosts;
