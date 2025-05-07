import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useUserStore = defineStore("user", {
  state: () => ({}),
  actions: {
    GetUsers(request) {
      return new Promise((resolve, reject) => {
        api
          .get(`users?offset=${request.offset}`)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    GetUser(request) {
      return new Promise((resolve, reject) => {
        api
          .get(`users/${request.id}`)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
  },
});
