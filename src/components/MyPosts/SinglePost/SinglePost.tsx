import styles from "./SinglePost.module.css";

interface PropsType {
  profilePicture: string | undefined;
  username: string;
  text: string;
}

const MyPost: React.FC<PropsType> = (props) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.user}>
          <img src={props.profilePicture} alt="profile" height="40" width="40" />
          <h3>{props.username}</h3>
        </div>
        <br />
        <p>{props.text}</p>
        <br />
      </div>
    </div>
  );
};

export default MyPost;
