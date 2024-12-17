<template>
  <div class="q-pa-xl column">
    <div class="bg-white q-pa-md items-start justify-start column">
      <div
        class="q-px-sm q-mb-lg row items-start justify-start"
        style="width: 100%"
      >
        <h5 class="col-12 text-center q-mt-sm q-mb-xl">
          You are about to take a quiz for the
          {{ courseStore.course[0].course_name }} course. Passing the quiz will
          qualify you to receive a certificate of completion. Take your time,
          and Good luck!
        </h5>
        <h5 class="col-12 q-my-none q-px-sm text-primary">LIST OF QUIZZES</h5>
      </div>
      <table-page
        :isViewOption="true"
        :isSearchTable="true"
        :showOptions="true"
        :rows="quizStore.quizzes"
        :columns="columns"
      />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import TablePage from "../../../components/TablePage.vue";
import {
  useQuizStore,
  useCourseStore,
} from "src/resources/lms/stores/course-store";
import { onMounted } from "vue";

const route = useRoute();
const quizStore = useQuizStore();
const courseStore = useCourseStore();

const courseId = route.params.course_id;

onMounted(() => {
  quizStore.fetchQuizData(courseId);
  courseStore.fetchCourseData(courseId);
});

const columns = [
  {
    name: "Quiz Name",
    label: "Quiz Name",
    field: "quiz_name",
    required: true,
    align: "left",
    sortable: true,
  },
  { name: "action", label: "Action", field: "action", align: "center" },
];
</script>
