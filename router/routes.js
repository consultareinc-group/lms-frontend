const routes = [
  {
    path: "/learning",
    name: "Learning Management System",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("../pages/IndexPage.vue"),
      },
      {
        path: "nav1",
        name: "Nav1",
        component: () => import("../pages/IndexPage.vue"),
      },
      {
        path: "list_quizzes",
        name: "List of Quizzes",
        component: () => import("../pages/UserCoursePage/ListQuizzes.vue"),
      },
      {
        path: "quiz_page",
        name: "Quiz Page",
        component: () => import("../pages/UserCoursePage/QuizPage.vue"),
      },
      {
        path: "course_management",
        name: "Course Management",
        component: () => import("../pages/AdminCoursePage/ViewPage.vue"),
      },
      {
        path: "add_course",
        name: "Add Course",
        component: () => import("../pages/AdminCoursePage/AddCourse.vue"),
      },
      {
        path: "view_course_details",
        name: "View Course Details",
        component: () => import("../pages/AdminCoursePage/ViewDetails.vue"),
      },
      {
        path: "edit_course",
        name: "Edit Course",
        component: () => import("../pages/AdminCoursePage/EditCourse.vue"),
      },
      {
        path: "add_quiz",
        name: "Add Quiz",
        component: () => import("../pages/AdminCoursePage/AddQuiz.vue"),
      },
      {
        path: "view_quiz",
        name: "View Quiz",
        component: () => import("../pages/AdminCoursePage/ViewQuiz.vue"),
      },
      {
        path: "edit_quiz",
        name: "Edit Quiz",
        component: () => import("../pages/AdminCoursePage/EditQuiz.vue"),
      },
      {
        path: "add_question",
        name: "Add Question",
        component: () => import("../pages/AdminCoursePage/AddQuestion.vue"),
      },
      {
        path: "view_question",
        name: "View Question",
        component: () => import("../pages/AdminCoursePage/ViewQuestion.vue"),
      },
      {
        path: "edit_question",
        name: "Edit Question",
        component: () => import("../pages/AdminCoursePage/EditQuestion.vue"),
      },
    ],
  },
];

export default routes;
