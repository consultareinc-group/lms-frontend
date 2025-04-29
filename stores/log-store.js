import { defineStore } from "pinia"; // Import Pinia's defineStore to create a state management store
import { api } from "boot/axios"; // Import the axios instance for API requests
import { LocalStorage } from "quasar";

// Define a Pinia store named 'counter' for managing course-related data
export const useLogStore = defineStore("logs", {
  state: () => ({
    logs: null,
  }),
  actions: {
    postLogs(request) {
      return new Promise((resolve, reject) => {
        api
          .post(`/lms/examinee/logs`, request)
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
