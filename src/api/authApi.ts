import { ResponseType, ResultCodeEnum, ResultCodeForCaptchaEnum, instance } from "./api";

interface GetAuthUserDataType {
  id: number;
  email: string;
  login: string;
}

interface LoginType {
  userId: number;
}

export const authAPI = {
  getAuthUserData() {
    return instance.get<ResponseType<GetAuthUserDataType>>(`auth/me`).then((res) => res.data);
  },
  login(
    email: string,
    password: string,
    remmemberMe: boolean = false,
    captcha: null | string = null
  ) {
    return instance.post<ResponseType<LoginType, ResultCodeEnum | ResultCodeForCaptchaEnum>>(
      `auth/login`,
      {
        email,
        password,
        remmemberMe,
        captcha,
      }
    );
  },
  logout() {
    return instance.delete(`auth/login`);
  },
};
