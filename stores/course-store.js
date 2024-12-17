import { defineStore } from "pinia";
import { api } from "src/boot/axios.js";
import { LocalStorage } from "quasar";

export const useLogStore = defineStore("logStore", {
  state: () => ({
    logs: { quiz_name: null },
  }),

  actions: {
    async postLogs() {
      try {
        console.log("Logs ", this.logs);

        const response = await api.post(`course-management/logs`, this.logs);
        console.log("Logs submitted successfully:", response.data.data);

        const logsId = response.data.data[0].id;
        console.log("logsId: ", logsId);

        return logsId;
      } catch (error) {
        console.error("Error submitting logs:", error);
      }
    },
    async getLogs(logsId) {
      try {
        const response = await api.get(`course-management/logs/${logsId}`);
        this.logs = response.data.data[0];

        // Fetch the quiz name based on the quiz_id from logs
        const quizId = this.logs.quiz_id;

        // Ensure quizzes are loaded in quizStore
        const quizStore = useQuizStore();
        // if (quizStore.quizzes.length === 0) {
        //   await quizStore.fetchQuizData(this.logs.course_id);
        // }

        // Match the quiz name
        const matchedQuiz = quizStore.quizzes.find(
          (quiz) => quiz.id === quizId
        );
        if (matchedQuiz) {
          this.logs.quiz_name = matchedQuiz.quiz_name;
          console.log("Quiz Name:", matchedQuiz.quiz_name);
        } else {
          console.warn("Quiz not found for quiz_id:", quizId);
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    },
    loadLogsFromStorage() {
      const storedLogs = LocalStorage.getItem("logs");
      if (storedLogs) {
        this.logs = storedLogs;
        console.log("Logs loaded from local storage:", this.logs);
      } else {
        console.log("error");
      }
    },
  },
});

export const useCourseStore = defineStore("courseStore", {
  state: () => ({
    course: [],
  }),

  actions: {
    async fetchCourseData(courseId) {
      try {
        const response = await api.get("course-management/course", {
          params: {
            id: courseId,
          },
        });
        console.log("Course: ", response.data.data);
        this.course = response.data.data;
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
    quizzes: [],
    score: null,
    status: null,
  }),

  actions: {
    async fetchQuizData(courseId) {
      try {
        const response = await api.get(`course-management/quiz/${courseId}`);
        console.log(response.data.data);
        this.quizzes = response.data.data;
      } catch (error) {
        console.error("Error getting quiz:", error);
      }
    },
    async submitAnswers(answers) {
      try {
        const response = await api.post(`course-management/answers`, {
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
        const response = await api.get(`course-management/questions/${quizId}`);
        console.log(response.data);
        this.questions = response.data;
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    },
  },
});
