import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useCategoryStore = defineStore("category", {
  state: () => ({}),
  actions: {
    GetCategories(request) {
      return new Promise((resolve, reject) => {
        api
          .get(`lms/category?offset=${request.offset}`)
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
