import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { reset } from "redux-form";

interface PropsType {
  userId: number;
  login: string;
  isAuth: boolean;

  logout: () => void;
}

const Navbar: React.FC<PropsType> = (props) => {
  return (
    <div className={styles.nav}>
      <div className={styles.wrapper}>
        <div className={styles.profile}>
          <NavLink to={props.userId ? `/users/${props.userId}` : `/login`}>
            {/* <img src="https://uploads6.wikiart.org/images/salvador-dali/the-persistence-of-memory-1931.jpg!Large.jpg" alt="profile" /> */}
            <p>{props.login}</p>
          </NavLink>
        </div>
        <div className={styles.menuItems}>
          <nav className={styles.menu}>
            <NavLink
              to={`posts`}
              style={({ isActive, isPending }) => {
                return {
                  opacity: isActive ? 100 : "",
                  color: isPending ? "red" : "black",
                };
              }}
            >
              Posts
            </NavLink>
            <NavLink
              to={`messages`}
              style={({ isActive, isPending }) => {
                return {
                  opacity: isActive ? 100 : "",
                  color: isPending ? "red" : "black",
                };
              }}
            >
              Messages
            </NavLink>
            <NavLink
              to={"news"}
              style={({ isActive, isPending }) => {
                return {
                  opacity: isActive ? 100 : "",
                  color: isPending ? "red" : "black",
                };
              }}
            >
              News
            </NavLink>
            <NavLink
              to={"chat"}
              style={({ isActive, isPending }) => {
                return {
                  opacity: isActive ? 100 : "",
                  color: isPending ? "red" : "black",
                };
              }}
            >
              Chat
            </NavLink>
            <NavLink
              to={"users"}
              style={({ isActive, isPending }) => {
                return {
                  opacity: isActive ? 100 : "",
                  color: isPending ? "red" : "black",
                };
              }}
            >
              Users
            </NavLink>
            {props.isAuth ? (
              <NavLink
                onClick={props.logout}
                to={"login"}
                style={({ isActive, isPending }) => {
                  return {
                    opacity: isActive ? 100 : "",
                    color: isPending ? "red" : "black",
                  };
                }}
              >
                Log out
              </NavLink>
            ) : (
              <NavLink
                to={"login"}
                style={({ isActive, isPending }) => {
                  return {
                    opacity: isActive ? 100 : "",
                    color: isPending ? "red" : "black",
                  };
                }}
              >
                Sign In
              </NavLink>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
