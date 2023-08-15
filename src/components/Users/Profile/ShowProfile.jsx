import React from "react";
import ProfileInfo from "./ProfileInfo";
import styles from "./Profile.module.css";
import SocialMediaIcons from "./SocialMediaIcons";
import userPhoto from "../../../assets/profile-picture.jpg";

const ShowProfile = (props) => {
  return (
    <div>
      {props.isAuth && (
        <div className={styles.editContainer}>
          <button onClick={props.toggleEditMode} className={styles.editBtn}>
            Edit profile
          </button>
        </div>
      )}
      <div className={styles.headingContainer}>
        <img
          src={props.userPhotoLarge ? props.userPhotoLarge : userPhoto}
          alt="user"
        />
        <div className={styles.fullName}>
          <h1>{props.userName}</h1>
          <div
            className={props.lookingForAJob ? styles.greenDot : styles.redDot}
          />
        </div>
        <ProfileInfo
          status={props.status}
          setUserStatus={props.setUserStatus}
          isAuth={props.isAuth}
        />
      </div>
      <div className={styles.aboutMeContainer}>
        <h2>About me</h2>
        <p className={props.aboutMe ? "" : styles.empty}>
          {props.aboutMe} I am very good at: {props.lookingForAJobDescription}
        </p>
      </div>
      <SocialMediaIcons contacts={props.contacts} />
    </div>
  );
};

export default ShowProfile;
