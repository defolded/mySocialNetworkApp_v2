export interface ProfileType {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
  photos: PhotosType;
  aboutMe: string;
}

export interface ContactsType {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
}

export interface PhotosType {
  small: string | null;
  large: string | null;
}

export interface UserType {
  id: number;
  name: string;
  status: string;
  photos: PhotosType;
  username?: null | string;
  profilePicture?: null | string;
  isFollowed?: null | boolean;
  message?: null | string;
  followed?: null | string;
}
