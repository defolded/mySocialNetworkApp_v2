import { SubmitHandler, useForm } from "react-hook-form";
import b from "../.././Button.module.css";
import { PostType } from "../../redux/postsReducer";
import styles from "./MyPosts.module.css";
import MyPost from "./SinglePost/SinglePost";

interface MapStateToPropsType {
  posts: PostType[];
  isAuth: boolean;
}

interface MapDispatchToPropsType {
  addPost: (t: string) => void;
}

const MyPosts: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
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
      {props.isAuth ? <AddPostForm addPost={props.addPost} /> : ""}
    </div>
  );
};

type FormInputs = {
  postText: string;
};

interface AddPostFormOwnPropsType {
  addPost: (t: string) => void;
}

const AddPostForm: React.FC<AddPostFormOwnPropsType> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data: any) => props.addPost(data.postText);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.searchForm}>
      <div className={b.userInput}>
        <input
          placeholder="Share your thoughts..."
          {...register("postText", { pattern: /^[a-zA-Z0-9_]+( [a-zA-Z0-9_!'.,-\\?]+)*$/i })}
          className={b.text}
        />
        <input type="submit" value="Submit" className={b.btn} />
      </div>
      {errors.postText && (
        <span
          style={{
            color: "#D10000",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Incorrect symbols.
        </span>
      )}
    </form>
  );
};

export default MyPosts;
