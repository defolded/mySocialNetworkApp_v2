import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import {
  getProfile,
  getUserStatus,
  sendProfile,
  setUserStatus,
  uploadPhoto,
} from "../../../redux/profileReducer";
import { AppStateType } from "../../../redux/redux-store";
import { ProfileType } from "../../../types/types";
import Profile from "./Profile";

interface PropsType {
  profile: ProfileType | null;
  status: string;
  aboutMe: string;
  loggedUser: number;
  isFetching: boolean;

  getProfile: (n: number) => void;
  getUserStatus: (n: number) => void;
  uploadPhoto: any;
  setUserStatus: (t: string) => void;
  sendProfile: any;
}

const ProfileContainer: React.FC<PropsType> = (props) => {
  let { userId } = useParams();
  let params = Number(userId);

  useEffect(() => {
    props.getProfile(params);
    props.getUserStatus(params);
  }, [params]);

  if (!props.profile) {
    return <></>;
  }

  return (
    <div>
      <Profile
        userPhotoLarge={props.profile.photos.large}
        setUserStatus={props.setUserStatus}
        status={props.status}
        userName={props.profile.fullName}
        aboutMe={props.profile.aboutMe}
        userId={props.profile.userId}
        loggedUser={props.loggedUser}
        lookingForAJobDescription={props.profile.lookingForAJobDescription}
        contacts={props.profile.contacts}
        profile={props.profile}
        sendProfile={props.sendProfile}
        isFetching={props.isFetching}
        lookingForAJob={props.profile.lookingForAJob}
        uploadPhoto={props.uploadPhoto}
      />
    </div>
  );
};

let mapStateToProps = (state: AppStateType) => {
  return {
    profile: state.profile.profile,
    status: state.profile.status,
    isFetching: state.profile.isFetching,
    loggedUser: state.auth.userId,
  };
};

export default compose<any>(
  connect(mapStateToProps, {
    getProfile,
    getUserStatus,
    setUserStatus,
    uploadPhoto,
    sendProfile,
  })
)(ProfileContainer);
