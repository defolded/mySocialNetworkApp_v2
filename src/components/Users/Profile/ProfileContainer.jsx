import {
  getProfile,
  getUserStatus,
  setUserStatus,
  uploadPhoto,
  sendProfile,
} from "../../../redux/profileReducer";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import { withAuthRedirect } from "../../../hoc/withAuthRedirect";
import { compose } from "redux";
import Profile from "./Profile";
import { useParams } from "react-router-dom";

const ProfileContainer = (props) => {
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
        uploadPhoto={props.uploadPhoto}
        userPhotoSmall={props.profile.photos.small}
        userPhotoLarge={props.profile.photos.large}
        setUserStatus={props.setUserStatus}
        status={props.status}
        userName={props.profile.fullName}
        aboutMe={props.profile.aboutMe}
        userId={props.profile.userId}
        loggedUser={props.loggedUser}
        lookingForAJob={props.profile.lookingForAJob}
        lookingForAJobDescription={props.profile.lookingForAJobDescription}
        contacts={props.profile.contacts}
        profile={props.profile}
        sendProfile={props.sendProfile}
        isFetching={props.isFetching}
      />
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    profile: state.profile.profile,
    status: state.profile.status,
    isFetching: state.profile.isFetching,
    loggedUser: state.auth.userId,
  };
};

export default compose(
  connect(mapStateToProps, {
    getProfile,
    getUserStatus,
    setUserStatus,
    uploadPhoto,
    sendProfile,
  }),
  withAuthRedirect
)(ProfileContainer);
