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
    // GetCategory(request) {
    //   return new Promise((resolve, reject) => {
    //     api
    //       .get(`lms/category/${request.id}`)
    //       .then((response) => {
    //         resolve(response.data);
    //       })
    //       .catch((error) => {
    //         reject(error.response.data);
    //       });
    //   });
    // },
    // SearchCategories(request) {
    //   return new Promise((resolve, reject) => {
    //     api
    //       .get(`lms/category?search_keyword=${request.keyword}`)
    //       .then((response) => {
    //         resolve(response.data);
    //       })
    //       .catch((error) => {
    //         reject(error.response.data);
    //       });
    //   });
    // },
  },
});
