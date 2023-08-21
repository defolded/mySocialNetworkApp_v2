import { instance } from "./api";

interface GetCaptchaResponseType {
  url: string;
}

export const securityAPI = {
  getCaptcha() {
    return instance.get<GetCaptchaResponseType>(`security/get-captcha-url`);
  },
};
