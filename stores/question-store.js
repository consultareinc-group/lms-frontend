import { defineStore } from 'pinia'; // Import Pinia's defineStore to create a state management store
import { api } from 'boot/axios'; // Import the axios instance for API requests
import { LocalStorage } from "quasar";

// Define a Pinia store named 'counter' for managing course-related data
export const useQuestionStore = defineStore('question', {
  state: () => ({
    questions: [],
  }),
  actions: {
    async fetchQuestionAndChoices(quizId) {
      try {
        const response = await api.get(`lms/examinee/questions/${quizId}`);
        this.questions = response.data;
        LocalStorage.set("questions", this.questions);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    },
  },
})
