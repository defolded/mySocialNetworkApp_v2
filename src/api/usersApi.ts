import { AxiosPromise } from "axios";
import { GetUsersItems, ResponseType, instance } from "./api";

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 0, term: string = "", friend: null | boolean = null, statusCheck: boolean, avatarCheck: boolean) {
    function statusFilter(data: GetUsersItems, querryPage: number, resultArray: any[]) {
      if (resultArray.length < pageSize) {
        data.items = [...data.items.filter(e => e.status !== null)];
        resultArray = [...resultArray, ...data.items];
        instance.get<GetUsersItems>(`users?page=${querryPage}&count=${pageSize}&term=${term}` +
          (friend === null ? "" : `&friend=${friend}`)).then((res) => statusFilter(res.data, querryPage + 1, resultArray));
      } else {
        data.items = [...resultArray];
        data.items.splice(32, data.items.length - 32);
        console.log(data.items.length);
        return data;
      }

    }

    return instance
      .get<GetUsersItems>(
        `users?page=${currentPage}&count=${pageSize}&term=${term}` +
        (friend === null ? "" : `&friend=${friend}`)
      )
      .then((res) => {
        if (statusCheck) {
          console.log('return done');
          return statusFilter(res.data, currentPage, []);
        } else if (!statusCheck) {
          return res.data;
        }
      });
  },

  follow(userId: number) {
    return instance.post<ResponseType>(`follow/${userId}`);
  },

  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`) as AxiosPromise<ResponseType>;
  },
};
