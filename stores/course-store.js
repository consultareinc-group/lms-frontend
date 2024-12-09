import axios from "axios";
import { defineStore } from "pinia";

export const useQuizStore = defineStore("quizStore", {
  state: () => ({
    quizzes: [],
  }),

  actions: {
    async fetchQuizData(courseId) {
      try {
        // Fetch quizzes for the course
        const quizResponse = await axios.get(
          `http://127.0.0.1:8000/api/course-management/quiz/${courseId}`
        );
        const quizzes = quizResponse.data.data;

        // Fetch questions for each quiz
        const questionsRequests = quizzes.map((quiz) =>
          axios.get(
            `http://127.0.0.1:8000/api/course-management/questions/${quiz.id}`
          )
        );
        const questionsResponses = await Promise.all(questionsRequests);

        // Combine quizzes with questions
        const quizzesWithQuestions = quizzes.map((quiz, index) => ({
          ...quiz,
          questions: questionsResponses[index].data.data,
        }));

        // Fetch choices for each question
        const choicesRequests = quizzesWithQuestions.flatMap((quiz) =>
          quiz.questions.map((question) =>
            axios.get(
              `http://127.0.0.1:8000/api/course-management/choices/${question.id}`
            )
          )
        );
        const choicesResponses = await Promise.all(choicesRequests);

        // Map choices to questions
        let choicesIndex = 0;
        const quizzesWithQuestionsAndChoices = quizzesWithQuestions.map(
          (quiz) => ({
            ...quiz,
            questions: quiz.questions.map((question) => ({
              ...question,
              choices: choicesResponses[choicesIndex++].data.data,
            })),
          })
        );

        console.log(
          "Quizzes with Questions and Choices: ",
          quizzesWithQuestionsAndChoices
        );

        // Update state
        this.quizzes = quizzesWithQuestionsAndChoices;
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    },
  },
});
