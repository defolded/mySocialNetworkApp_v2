import { AxiosPromise } from "axios";
import { GetUsersItems, ResponseType, instance } from "./api";

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 0) {
      return instance
        .get<GetUsersItems>(`users?page=${currentPage}&count=${pageSize}`)
        .then((res) => res.data);
    },
  
    follow(userId: number) {
      return instance.post<ResponseType>(`follow/${userId}`);
    },
  
    unfollow(userId: number) {
      return instance.delete(`follow/${userId}`) as AxiosPromise<ResponseType>;
    },
};