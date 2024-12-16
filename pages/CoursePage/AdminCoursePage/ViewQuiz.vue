<template>
  <q-page class="q-pa-md column">
    <page-breadcrumbs
      title="Course Management"
      :items="[
        {
          label: 'Learning Management System',
          // icon: 'home',
          to: { name: 'Course Management' },
        },
        {
          label: 'Course Management',
          // icon: 'home',
          to: { name: 'Course Management' },
        },
        {
          label: 'View Course Details',
          // icon: 'home',
          to: {
            name: 'View Course Details',
            params: { course_id: route.params.course_id },
          },
        },
        {
          label: 'View Quiz',
          // icon: 'home',
          to: { name: 'View Quiz' },
        },
      ]"
    />
    <div class="col-grow items-start justify-start column">
      <div
        class="bg-white q-my-lg q-py-lg q-px-xl items-start justify-start column"
        style="width: 100%"
      >
        <header class="q-mb-md">
          <h6 class="q-ma-none">Quiz Details</h6>
        </header>
        <!---->
        <div class="row" style="width: 100%">
          <!---->
          <div class="col-4 q-px-sm">
            <div class="q-my-md">
              <p class="q-mb-sm">Quiz ID:</p>
              <q-skeleton v-if="!quiz.id" square />
              <p v-else class="q-mb-sm text-weight-light">{{ quiz.id }}</p>
            </div>
            <!---->
            <div class="q-my-md">
              <p class="q-mb-sm">Date Added:</p>
              <q-skeleton v-if="!quiz.date_time_added" square />
              <p v-else class="q-mb-sm text-weight-light">
                {{ date.formatDate(quiz.date_time_added, "YYYY-MM-DD") }}
              </p>
            </div>
          </div>
          <!---->
          <div class="col-4 q-px-sm">
            <div class="q-my-md">
              <p class="q-mb-sm">Quiz Name:</p>
              <q-skeleton v-if="!quiz.quiz_name" square />
              <p v-else class="q-mb-sm text-weight-light">
                {{ quiz.quiz_name }}
              </p>
            </div>
            <!---->
            <div class="q-my-md">
              <p class="q-mb-sm">Last Updated:</p>
              <q-skeleton v-if="!quiz.date_time_updated" square />
              <p v-else class="q-mb-sm text-weight-light">
                {{ quiz.date_time_updated }}
              </p>
            </div>
          </div>
          <!---->
          <div class="col-4 q-px-sm">
            <div class="q-my-md">
              <p class="q-mb-sm">Passing Percentage:</p>
              <q-skeleton v-if="!quiz.passing_percentage" square />
              <p v-else class="q-mb-sm text-weight-light">
                {{ quiz.passing_percentage }}%
              </p>
            </div>
            <!---->
            <div class="q-my-md">
              <p class="q-mb-sm">No of Questions:</p>
              <p class="q-mb-sm text-weight-light">3</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quizzes -->
      <div
        class="bg-white q-my-lg q-py-md q-px-lg items-start justify-start column"
        style="width: 100%"
      >
        <h6 class="q-ma-none text-primary text-weight-bold q-px-sm">
          Questions
        </h6>
        <!-- <table-page
          :isViewOption="false"
          :isSearchTable="false"
          :showOptions="false"
          :rows="rows"
          :columns="columns"
        /> -->
      </div>

      <!-- Button -->
      <!-- <q-btn
        :to="{ name: 'Add Question' }"
        label="Add Question"
        no-caps
        flat
        class="bg-primary text-white q-mt-lg"
      />
      <q-btn
        @click="handleOpenSuccesModal"
        label="Save"
        no-caps
        flat
        class="bg-accent text-white q-px-xl q-mt-lg"
      /> -->
    </div>
  </q-page>
</template>

<script setup>
import { date } from "quasar";
import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import { ref, onMounted } from "vue";
import { useCourseStore } from "../../../stores/course-store";
import { useRoute } from "vue-router";

const store = useCourseStore();
const route = useRoute();

const columns = [
  {
    name: "name",
    required: true,
    label: "No.",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "Question",
    align: "center",
    label: "Question",
    field: "question",
  },
  { name: "Marks", label: "Marks", field: "marks" },
  { name: "action", field: "action" },
];

const quiz = ref({
  id: "",
  quiz_name: "",
  passing_percentage: "",
  date_time_added: "",
  date_time_updated: "",
  id: "",
});

onMounted(() => {
  store.GetQuiz({ id: route.params.quiz_id }).then((response) => {
    if (response.status === "success") {
      if (response.data.length) {
        quiz.value = response.data[0];
      }
    }
  });
});
</script>
