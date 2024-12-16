import { defineStore } from 'pinia'; // Import Pinia's defineStore to create a state management store
import { api } from 'boot/axios'; // Import the axios instance for API requests

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
    }
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
    // Action to fetch courses from the API with pagination support
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
    // Action to insert quiz
    PostQuiz(request) {
      return new Promise((resolve, reject) => {
        // Make a POST request to insert courses in the database courses table
        api.post(`lms/quiz`, request).then((response) => {
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
  },

});
