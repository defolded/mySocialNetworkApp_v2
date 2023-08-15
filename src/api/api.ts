import axios from "axios";
import { ProfileType } from "../types/types";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: { "API-KEY": process.env.SAMURAI_SECRET_KEY },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 0) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((res) => res.data);
  },

  follow(userId: number) {
    return instance.post(`follow/${userId}`);
  },

  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`);
  },
};

export const profileAPI = {
  getProfile(profileId = 2) {
    return instance.get(`profile/${profileId}`).then((res) => res.data);
  },

  getStatus(profileId: number) {
    return instance.get(`profile/status/${profileId}`);
  },

  updateStatus(status: string) {
    return instance.put(`profile/status`, { status });
  },

  uploadPhoto(photo: any) {
    const formData = new FormData();
    formData.append("image", photo);

    return instance.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  sendProfile(profile: ProfileType) {
    return instance.put(`profile`, profile);
  },
};


export enum ResultCodeEnum {
  SuccesResultCode = 0,
  ErrorResultCode = 1
}

export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10
}

interface GetAuthUserDataType {
  data: {
    id: number
    email: string
    login: string
  }
  resultCode: ResultCodeEnum
  messages: string[]
}

interface LoginType {
  data: {
    userId: number
  }
  resultCode: ResultCodeEnum | ResultCodeForCaptchaEnum
  messages: string[]
}

export const authAPI = {
  getAuthUserData() {
    return instance.get<GetAuthUserDataType>(`auth/me`).then((res) => res.data);
  },
  login(email: string, password: string, remmemberMe: boolean = false, captcha: null | string = null) {
    return instance.post<LoginType>(`auth/login`, {
      email,
      password,
      remmemberMe,
      captcha,
    });
  },
  logout() {
    return instance.delete(`auth/login`);
  },
};

export const securityAPI = {
  getCaptcha() {
    return instance.get(`security/get-captcha-url`);
  },
};
