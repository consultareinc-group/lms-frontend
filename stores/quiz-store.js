import { defineStore } from 'pinia'; // Import Pinia's defineStore to create a state management store
import { api } from 'boot/axios'; // Import the axios instance for API requests
import { LocalStorage } from "quasar";

// Define a Pinia store named 'counter' for managing course-related data
export const useQuizStore = defineStore('quiz', {
  state: () => ({
    quiz: [],
    quizzes: [],
    quizResult: {
      passing_percentage: null,
      score: null,
      status: null,
    },
  }),
  actions: {
    async fetchQuizDataByCourse(courseId) {
      try {
        const response = await api.get(
          `lms/examinee/quiz_by_course/${courseId}`
        );
        this.quizzes = response.data.data;
        return this.quizzes;
      } catch (error) {
        console.error("Error getting quiz:", error);
      }
    },
    async fetchQuizData(quizId) {
      try {
        const response = await api.get(`lms/examinee/quiz/${quizId}`);
        this.quiz = response.data.data[0];
        LocalStorage.set("quiz", this.quiz);
      } catch (error) {
        console.error("Error getting quiz: ", error);
      }
    },
    async submitAnswers(answers, quizId) {
      try {
        const response = await api.post(`lms/examinee/answers`, {
          answers,
          quiz_id: quizId,
        });
        this.quizResult.passing_percentage = response.data.passing_percentage;
        this.quizResult.score = response.data.score;
        this.quizResult.status = response.data.status;
      } catch (error) {
        console.error(error);
      }
    },
  },
})
