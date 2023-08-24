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

export interface GetUsersDataType {
  followed: boolean;
  id: number;
  name: string;
  photos: PhotosType;
  status: string | null;
  uniqueUrlName: string | null;
}