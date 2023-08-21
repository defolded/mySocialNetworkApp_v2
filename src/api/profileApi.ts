import { ContactsType, PhotosType, ProfileType } from "../types/types";
import { ResponseType, instance } from "./api";

interface UploadPhotoDataType {
  photos: PhotosType;
}

interface GetProfileDataType {
  aboutMe: string;
  contacts: ContactsType;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  userId: number;
  photos: PhotosType;
}

export const profileAPI = {
  getProfile(profileId = 2) {
    return instance.get<GetProfileDataType>(`profile/${profileId}`).then((res) => res.data);
  },

  getStatus(profileId: number) {
    return instance.get<string>(`profile/status/${profileId}`);
  },

  updateStatus(status: string) {
    return instance.put<ResponseType>(`profile/status`, { status });
  },

  uploadPhoto(photo: any) {
    const formData = new FormData();
    formData.append("image", photo);

    return instance.put<ResponseType<UploadPhotoDataType>>(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  sendProfile(profile: ProfileType) {
    return instance.put<ResponseType>(`profile`, profile);
  },
};
