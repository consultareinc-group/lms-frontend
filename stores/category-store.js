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
    GetCategory(request) {
      return new Promise((resolve, reject) => {
        api
          .get(`lms/category/${request.id}`)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    EditCategory(request) {
      return new Promise((resolve, reject) => {
        api
          .put(`lms/category/${request.id}`, request.id)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },

    DeleteCategory(request) {
      return new Promise((resolve, reject) => {
        api
          .delete(`lms/category/${request.id}`, {
            data: { id: request.id },
          })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            console.error("Delete Category Error:", error);
            reject(error.response?.data || error.message);
          });
      });
    },
  },
});
