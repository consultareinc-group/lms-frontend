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
        path: "course_management",
        name: "Course Management",
        component: () =>
          import("../pages/CoursePage/AdminCoursePage/ViewPage.vue"),
      },
      {
        path: "add_course",
        name: "Add Course",
        component: () =>
          import("../pages/CoursePage/AdminCoursePage/AddCourse.vue"),
      },
      {
        path: "view_course_details",
        name: "View Course Details",
        component: () =>
          import("../pages/CoursePage/AdminCoursePage/ViewDetails.vue"),
      },
      {
        path: "edit_course",
        name: "Edit Course",
        component: () =>
          import("../pages/CoursePage/AdminCoursePage/EditCourse.vue"),
      },
      {
        path: "add_quiz",
        name: "Add Quiz",
        component: () =>
          import("../pages/CoursePage/AdminCoursePage/AddQuiz.vue"),
      },
      {
        path: "view_quiz",
        name: "View Quiz",
        component: () =>
          import("../pages/CoursePage/AdminCoursePage/ViewQuiz.vue"),
      },
      {
        path: "edit_quiz",
        name: "Edit Quiz",
        component: () =>
          import("../pages/CoursePage/AdminCoursePage/EditQuiz.vue"),
      },
      {
        path: "add_question",
        name: "Add Question",
        component: () =>
          import("../pages/CoursePage/AdminCoursePage/AddQuestion.vue"),
      },
      {
        path: "view_question",
        name: "View Question",
        component: () =>
          import("../pages/CoursePage/AdminCoursePage/ViewQuestion.vue"),
      },
      {
        path: "edit_question",
        name: "Edit Question",
        component: () =>
          import("../pages/CoursePage/AdminCoursePage/EditQuestion.vue"),
      },
    ],
  },
  {
    path: "/lms",
    name: "Learning Management System Client",
    component: () =>
      import("../pages/CoursePage/UserCoursePage/UserLayout.vue"),
    children: [
      {
        path: "/list_quizzes/:course_id",
        name: "List of Quizzes",
        component: () =>
          import("../pages/CoursePage/UserCoursePage/ListQuizzes.vue"),
      },
      {
        path: "/quiz_page/:quiz_id",
        name: "Quiz Page",
        component: () =>
          import("../pages/CoursePage/UserCoursePage/QuizPage.vue"),
      },
      {
        path: "/certification_page",
        name: "Certification Page",
        component: () =>
          import("../pages/CoursePage/UserCoursePage/CertificationPage.vue"),
      },
    ],
  },
];

export default routes;
