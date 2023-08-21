import React, { useState } from "react";
import EditProfile from "./EditProfile";
import ShowProfile from "./ShowProfile";
import Preloader from "../../common/Preloader/Preloader";
import { ContactsType, ProfileType } from "../../../types/types";

interface PropsType {
  userId: number;
  loggedUser: number;
  isFetching: boolean;
  profile: ProfileType;
  userPhotoLarge: any;
  userName: string;
  aboutMe: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  contacts: ContactsType;
  status: string;

  sendProfile: (O: ProfileType) => Promise<any>;
  setUserStatus: (t: string) => void;
  uploadPhoto: (file: File) => void;
}

const Profile: React.FC<PropsType> = (props) => {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  let isAuth = props.userId === props.loggedUser;

  const onSubmit = (formData: any) => {
    props.sendProfile(formData).then(() => toggleEditMode());
  };

  if (props.isFetching) {
    return <Preloader />;
  }

  return (
    <div>
      {editMode ? (
        <EditProfile
          initialValues={props.profile}
          isAuth={isAuth}
          userPhotoLarge={props.userPhotoLarge}
          onSubmit={onSubmit}
          status={props.status}
          setUserStatus={props.setUserStatus}
          uploadPhoto={props.uploadPhoto}
        />
      ) : (
        <ShowProfile
          toggleEditMode={toggleEditMode}
          isAuth={isAuth}
          userPhotoLarge={props.userPhotoLarge}
          userName={props.userName}
          aboutMe={props.aboutMe}
          lookingForAJob={props.lookingForAJob}
          lookingForAJobDescription={props.lookingForAJobDescription}
          contacts={props.contacts}
          status={props.status}
          setUserStatus={props.setUserStatus}
        />
      )}
    </div>
  );
};

export default Profile;
