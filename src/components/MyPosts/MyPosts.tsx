import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import b from "../.././Button.module.css";
import { AppStateType } from "../../redux/redux-store";
import styles from "./MyPosts.module.css";
import MyPost from "./SinglePost/SinglePost";

const MyPosts: React.FC<{ addPost: (t: string) => void }> = ({ addPost }) => {
  const posts = useSelector((state: AppStateType) => state.posts.posts);
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

  return (
    <div className={styles.wrapper}>
      <div className={styles.postsList}>
        {posts.map((p) => (
          <MyPost
            profilePicture={p.profilePicture}
            username={p.username}
            text={p.message}
            key={crypto.randomUUID()}
          />
        ))}
      </div>
      {isAuth ? <AddPostForm addPost={addPost} /> : ""}
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
          style={{ padding: "10px" }}
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
