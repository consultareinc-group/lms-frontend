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
    async postLogs() {
      try {
        if (this.logs.length === 0) {
          console.warn("No logs to submit");
          return;
        }
        console.log("Logs to be submitted:", this.logs);

        const response = await api.post(`/course-management/logs`, this.logs);
        console.log("Logs submitted successfully:", response.data);

        // clear logs after successful submission
        // this.logs = [];
      } catch (error) {
        console.error("Error submitting logs:", error);
      }
    },
  },
});

export const useQuizStore = defineStore("quizStore", {
  state: () => ({
    quizzes: [],
    score: null,
    status: null,
  }),

  actions: {
    async fetchQuizData(courseId) {
      try {
        const response = await api.get(`/course-management/quiz/${courseId}`);
        console.log(response.data.data);
        this.quizzes = response.data.data;
      } catch (error) {
        console.error("Error getting quiz:", error);
      }
    },
    async submitAnswers(answers) {
      try {
        const response = await api.post(`/course-management/submit`, {
          answers,
        });
        this.score = response.data.score;
        this.status = response.data.status;
        console.log("Result:", response.data);
      } catch (error) {
        console.error(error);
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
