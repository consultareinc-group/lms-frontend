import { defineStore } from "pinia";
import { api } from "src/boot/axios.js";
import { LocalStorage } from "quasar";

export const useLogStore = defineStore("logStore", {
  state: () => ({
    logs: null,
  }),

  actions: {
    async postLogs() {
      try {
        this.logs = LocalStorage.getItem("userDetails");

        const response = await api.post(`course-management/logs`, this.logs);
      } catch (error) {
        console.error("Error submitting logs:", error);
      }
    },
    async getLogs() {},
  },
});

export const useCourseStore = defineStore("courseStore", {
  state: () => ({
    course: [],
  }),

  actions: {
    async fetchCourseData(courseId) {
      try {
        const response = await api.get(`course-management/course/${courseId}`);
        this.course = response.data.data[0];
        try {
          LocalStorage.set("course", this.course);
        } catch (error) {
          console.error("Error saving course to local storage: ", error);
        }
      } catch (error) {
        console.error("Error fetching course: ", error);
      }
    },
  },
});

export const useQuizStore = defineStore("quizStore", {
  state: () => ({
    quiz: [],
    quizzes: [],
    score: null,
    status: null,
  }),

  actions: {
    async fetchQuizDataByCourse(courseId) {
      try {
        const response = await api.get(
          `course-management/quiz_by_course/${courseId}`
        );
        this.quizzes = response.data.data;
      } catch (error) {
        console.error("Error getting quiz:", error);
      }
    },
    async fetchQuizData(quizId) {
      try {
        const response = await api.get(`course-management/quiz/${quizId}`);
        this.quiz = response.data.data[0];
        LocalStorage.set("quiz", this.quiz);
      } catch (error) {
        console.error("Error getting quiz: ", error);
      }
    },
    async submitAnswers(answers) {
      try {
        const response = await api.post(`course-management/answers`, {
          answers,
        });
        this.score = response.data.score;
        this.status = response.data.status;
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
        const response = await api.get(`course-management/questions/${quizId}`);
        this.questions = response.data;
        LocalStorage.set("questions", this.questions);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    },
  },
});
