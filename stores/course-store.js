import { defineStore } from 'pinia'; // Import Pinia's defineStore to create a state management store
import { api } from 'boot/axios'; // Import the axios instance for API requests
import { LocalStorage } from "quasar";

// Define a Pinia store named 'counter' for managing course-related data
export const useCourseStore = defineStore('course', {
  state: () => ({
    Courses: [], // Reactive array to store the list of courses
    Course: {
      id: '',
      name: '',
    },
    Quiz: {
      id: '',
      name: ''
    },
    logs: null,
    course: {
      course_name: ''
    },
    quiz: [],
    quizzes: [],
    quizResult: {
      passing_percentage: null,
      score: null,
      status: null,
    },
    questions: [],
  }),
  actions: {
    // Action to fetch courses from the API with pagination support
    GetCourses(request) {
      return new Promise((resolve, reject) => {
        // Make a GET request to fetch courses based on the offset
        api.get(`lms/course?offset="${request.offset}"`).then((response) => {
          resolve(response.data); // Resolve the promise with the API response data
        }).catch((response) => {
          reject(response.data); // Reject the promise if the API request fails
        });
      });
    },
    // Action to fetch specific course from the API
    GetCourse(request) {
      return new Promise((resolve, reject) => {
        // Make a GET request to fetch courses based on the offset
        api.get(`lms/course/${request.id}`).then((response) => {
          resolve(response.data); // Resolve the promise with the API response data
        }).catch((response) => {
          reject(response.data); // Reject the promise if the API request fails
        });
      });
    },
    // Action to search for courses using a keyword
    SearchCourses(request) {
      return new Promise((resolve, reject) => {
        // Make a GET request to fetch courses matching the search keyword
        api.get(`lms/course?search_keyword="${request.keyword}"`).then((response) => {
          resolve(response.data); // Resolve the promise with the API response data
        }).catch((response) => {
          reject(response.data); // Reject the promise if the API request fails
        });
      });
    },
    // Action to insert courses
    PostCourse(request) {
      return new Promise((resolve, reject) => {
        // Make a POST request to insert courses in the database courses table
        api.post(`lms/course`, request).then((response) => {
          resolve(response.data); // Resolve the promise with the API response data
        }).catch((response) => {
          reject(response.data); // Reject the promise if the API request fails
        });
      });
    },
    // Action to insert courses
    PutCourse(request) {
      return new Promise((resolve, reject) => {
        // Make a POST request to insert courses in the database courses table
        api.put(`lms/course/${request.id}`, request).then((response) => {
          resolve(response.data); // Resolve the promise with the API response data
        }).catch((response) => {
          reject(response.data); // Reject the promise if the API request fails
        });
      });
    },
    // Action to fetch quizzes from the API with pagination support
    GetQuizzes(request) {
      return new Promise((resolve, reject) => {
        // Make a GET request to fetch quizzes based on the offset
        api.get(`lms/quiz?offset="${request.offset}"&course_id=${request.course_id}`).then((response) => {
          resolve(response.data); // Resolve the promise with the API response data
        }).catch((response) => {
          reject(response.data); // Reject the promise if the API request fails
        });
      });
    },
    // Action to fetch specific quiz from the API
    GetQuiz(request) {
      return new Promise((resolve, reject) => {
        // Make a GET request to fetch courses based on the offset
        api.get(`lms/quiz/${request.id}`).then((response) => {
          resolve(response.data); // Resolve the promise with the API response data
        }).catch((response) => {
          reject(response.data); // Reject the promise if the API request fails
        });
      });
    },
    // Action to search for quizzes using a keyword
    SearchQuizzes(request) {
      return new Promise((resolve, reject) => {
        // Make a GET request to fetch quizzes matching the search keyword
        api.get(`lms/quiz?search_keyword="${request.keyword}"`).then((response) => {
          resolve(response.data); // Resolve the promise with the API response data
        }).catch((response) => {
          reject(response.data); // Reject the promise if the API request fails
        });
      });
    },
    // Action to insert quiz
    PostQuiz(request) {
      return new Promise((resolve, reject) => {
        // Make a POST request to insert quiz in the database quiz table
        api.post(`lms/quiz`, request).then((response) => {
          resolve(response.data); // Resolve the promise with the API response data
        }).catch((response) => {
          reject(response.data); // Reject the promise if the API request fails
        });
      });
    },
    // Action to update quiz
    PutQuiz(request) {
      return new Promise((resolve, reject) => {
        // Make a PUT request to update quiz in the database quiz table
        api.put(`lms/quiz/${request.id}`, request).then((response) => {
          resolve(response.data); // Resolve the promise with the API response data
        }).catch((response) => {
          reject(response.data); // Reject the promise if the API request fails
        });
      });
    },
    // Action to fetch questions from the API with pagination support
    GetQuestions(request) {
      return new Promise((resolve, reject) => {
        // Make a GET request to fetch questions based on the offset
        api.get(`lms/question?offset="${request.offset}"&quiz_id=${request.quiz_id}"`).then((response) => {
          resolve(response.data); // Resolve the promise with the API response data
        }).catch((response) => {
          reject(response.data); // Reject the promise if the API request fails
        });
      });
    },
    // Action to fetch question from the API
    GetQuestion(request) {
      return new Promise((resolve, reject) => {
        // Make a GET request to fetch question based on the offset
        api.get(`lms/question/${request.id}`).then((response) => {
          resolve(response.data); // Resolve the promise with the API response data
        }).catch((response) => {
          reject(response.data); // Reject the promise if the API request fails
        });
      });
    },
    // Action to search for questions using a keyword
    SearchQuestions(request) {
      return new Promise((resolve, reject) => {
        // Make a GET request to fetch questions matching the search keyword
        api.get(`lms/question?search_keyword="${request.keyword}&quiz_id=${request.quiz_id}"`).then((response) => {
          resolve(response.data); // Resolve the promise with the API response data
        }).catch((response) => {
          reject(response.data); // Reject the promise if the API request fails
        });
      });
    },
    // Action to insert question
    PostQuestion(request) {
      return new Promise((resolve, reject) => {
        // Make a POST request to insert courses in the database courses table
        api.post(`lms/question`, request).then((response) => {
          resolve(response.data); // Resolve the promise with the API response data
        }).catch((response) => {
          reject(response.data); // Reject the promise if the API request fails
        });
      });
    },
    // Action to update quiz
    PutQuestion(request) {
      return new Promise((resolve, reject) => {
        // Make a PUT request to update quiz in the database quiz table
        api.put(`lms/question/${request.id}`, request).then((response) => {
          resolve(response.data); // Resolve the promise with the API response data
        }).catch((response) => {
          reject(response.data); // Reject the promise if the API request fails
        });
      });
    },
    async fetchCourseData(courseId) {
      try {
        const response = await api.get(`lms/examinee/course/${courseId}`);
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
  },
})
