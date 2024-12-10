import { defineStore } from "pinia";
import { api } from "src/boot/axios.js";

export const useQuizStore = defineStore("quizStore", {
  state: () => ({
    quizzes: [],
  }),

  actions: {
    async fetchQuizData(courseId) {
      try {
        // Fetch quizzes for the course
        const response = await api.get(`/course-management/quiz/${courseId}`);
        console.log(response.data);
        this.quizzes = response.data.data;
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    },
  },
});
