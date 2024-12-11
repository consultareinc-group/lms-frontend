import { defineStore } from "pinia";
import { api } from "src/boot/axios.js";

export const addLog = defineStore("logStore", {
  state: () => ({
    logs: [], // Array to store logs locally
  }),

  actions: {
    logUserInfo(log) {
      this.logs.push(log);
      console.log("Log added:", log);
    },
  },
});

export const useQuizStore = defineStore("quizStore", {
  state: () => ({
    quizzes: [],
  }),

  actions: {
    async fetchQuizData(courseId) {
      try {
        const response = await api.get(`/course-management/quiz/${courseId}`);
        console.log(response.data.data);
        this.quizzes = response.data.data;
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    },
  },
});

export const useQuestionStore = defineStore("questionStore", {
  state: () => ({
    questions: [],
  }),

  actions: {
    async fetchQuestionAndChoices(quizId) {
      try {
        const response = await api.get(
          `/course-management/questions/${quizId}`
        );
        console.log(response.data);
        this.questions = response.data;
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    },
  },
});
