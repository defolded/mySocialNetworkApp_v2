import React, { ChangeEvent } from "react";
import styles from "./Profile.module.css";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import ProfileInfo from "./ProfileInfo";

interface EditProfileOwnPropsType {
  userPhotoLarge: string | undefined
  status: string
  isAuth: boolean
  
  uploadPhoto: (file: File) => void
  setUserStatus: (t: string) => void
}

interface EditProfileOwnValuesType {

}

const EditProfile:React.FC<InjectedFormProps<EditProfileOwnValuesType, EditProfileOwnPropsType> & EditProfileOwnPropsType> = (props) => {
  const onPhotoUpload = (photo: ChangeEvent<HTMLInputElement>) => {
    if (photo.target.files?.length) {
      props.uploadPhoto(photo.target.files[0]);
    }
  };
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={styles.editContainer}>
        <button className={styles.editBtn}>Save</button>
        {props.error && <h3>{props.error}</h3>}
        {/* <button className={styles.editBtn}>Exit</button> */}
      </div>
      <div className={styles.headingContainer}>
        <img src={props.userPhotoLarge} alt="user" />
        <input type="file" onChange={onPhotoUpload} />
        <div className={styles.fullName}>
          <Field placeholder="Name" name="fullName" component="input" />
          <div>
            <Field name="lookingForAJob" component="input" type="checkbox" />
          </div>
        </div>
        <ProfileInfo
          editMode={true}
          status={props.status}
          setUserStatus={props.setUserStatus}
          isAuth={props.isAuth}
        />
      </div>
      <div className={styles.aboutMeContainer}>
        <h2>About me</h2>
        <Field placeholder="About Me" name="aboutMe" component="input" />{" "}
        <Field
          placeholder="Skills description"
          name="lookingForAJobDescription"
          component="input"
        />
      </div>
    </form>
  );
};

const EditProfileWithForm = reduxForm<EditProfileOwnValuesType, EditProfileOwnPropsType>({
  form: "edit-profile",
  enableReinitialize: true,
  destroyOnUnmount: false,
})(EditProfile);

export default EditProfileWithForm;
