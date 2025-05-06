const routes = [
  {
    path: "/learning",
    name: "Learning Management System",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      // Course Management
      {
        path: "course_management",
        name: "Course Management",
        component: () =>
          import("../pages/CoursePage/AdminCoursePage/ViewCourse.vue"),
        meta: { role: 0, requiresAuth: true },
      },
      {
        path: "add_course",
        name: "Add Course",
        component: () =>
          import("../pages/CoursePage/AdminCoursePage/AddCourse.vue"),
        meta: { role: 0, requiresAuth: true },
      },
      {
        path: "view_course_details/:course_id",
        name: "View Course Details",
        component: () =>
          import("../pages/CoursePage/AdminCoursePage/ViewDetails.vue"),
        meta: { role: 0, requiresAuth: true },
      },
      {
        path: "edit_course/:course_id?",
        name: "Edit Course",
        component: () =>
          import("../pages/CoursePage/AdminCoursePage/EditCourse.vue"),
        meta: { role: 0, requiresAuth: true },
      },
      {
        path: "add_quiz/:course_id",
        name: "Add Quiz",
        component: () =>
          import("../pages/CoursePage/AdminCoursePage/AddQuiz.vue"),
        meta: { role: 0, requiresAuth: true },
      },
      {
        path: "view_quiz/:course_id/:quiz_id",
        name: "View Quiz",
        component: () =>
          import("../pages/CoursePage/AdminCoursePage/ViewQuiz.vue"),
        meta: { role: 0, requiresAuth: true },
      },
      {
        path: "edit_quiz/:course_id?/:quiz_id?",
        name: "Edit Quiz",
        component: () =>
          import("../pages/CoursePage/AdminCoursePage/EditQuiz.vue"),
        meta: { role: 0, requiresAuth: true },
      },
      {
        path: "add_question/:quiz_id",
        name: "Add Question",
        component: () =>
          import("../pages/CoursePage/AdminCoursePage/AddQuestion.vue"),
        meta: { role: 0, requiresAuth: true },
      },
      {
        path: "view_question",
        name: "View Question",
        component: () =>
          import("../pages/CoursePage/AdminCoursePage/ViewQuestion.vue"),
        meta: { role: 0, requiresAuth: true },
      },
      {
        path: "edit_question/:course_id/:quiz_id/:question_id",
        name: "Edit Question",
        component: () =>
          import("../pages/CoursePage/AdminCoursePage/EditQuestion.vue"),
        meta: { role: 0, requiresAuth: true },
      },
      {
        path: "add_category",
        name: "Add Category",
        component: () =>
          import("../pages/CoursePage/AdminCoursePage/AddCategory.vue"),
        meta: { role: 0, requiresAuth: true },
      },

      // User Management
      {
        path: "user_management",
        name: "User Management",
        component: () => import("../pages/UserManagement/UserManagement.vue"),
        meta: { role: 0, requiresAuth: true },
      },
      {
        path: "user_management/user_certificates/:user_id",
        name: "User Certificates",
        component: () => import("../pages/UserManagement/UserCertificates.vue"),
        meta: { role: 0, requiresAuth: true },
      },
    ],
  },

  // Examinee / TrainingAce
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
        meta: { requiresAuth: true },
      },
      {
        path: "/quiz_page/:quiz_id",
        name: "Quiz Page",
        component: () =>
          import("../pages/CoursePage/UserCoursePage/QuizPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/certification_page/:log_id?",
        name: "Certification Page",
        component: () =>
          import("../pages/CoursePage/UserCoursePage/CertificationPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "courses/:category_id?/:category_name?",
        name: "Courses",
        component: () => import("../pages/TrainingAce/CourseList.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "courses/:id",
        name: "CourseDetails",
        component: () => import("../pages/TrainingAce/CourseDetails.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "select_category",
        name: "Select Category",
        component: () => import("../pages/TrainingAce/SelectCategory.vue"),
        meta: { requiresAuth: false },
      },
    ],
  },
];

export default routes;
