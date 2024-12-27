import { defineStore } from 'pinia'; // Import Pinia's defineStore to create a state management store
import { api } from 'boot/axios'; // Import the axios instance for API requests
import { LocalStorage } from "quasar";

// Define a Pinia store named 'counter' for managing course-related data
export const useLogStore = defineStore('logs', {
  state: () => ({
    logs: null,
  }),
  actions: {
    async postLogs() {
      try {
        this.logs = LocalStorage.getItem("userDetails");

        const response = await api.post(`/lms/examinee/logs`, this.logs);
        LocalStorage.set("userDetails", response.data.data[0]);
      } catch (error) {
        console.error("Error submitting logs:", error);
      }
    },

  },
})
