import axios from "axios";
import { GetUsersDataType } from "../types/types";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: { "API-KEY": process.env.SAMURAI_SECRET_KEY },
});

export enum ResultCodeEnum {
  SuccesResultCode = 0,
  ErrorResultCode = 1,
}

export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10,
}

export type ResponseType<D = {}, RC = ResultCodeEnum> = {
  data: D;
  messages: string[];
  resultCode: RC;
};

export type GetUsersItems = {
  items: GetUsersDataType[];
  totalCount: number;
  error: string | null;
};

export type GetUserMessages = {
  items: any[];
  totalCount: number;
  error: string | null;
}