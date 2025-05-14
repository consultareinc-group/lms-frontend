<template>
  <div class="q-pa-xl column">
    <div class="bg-white q-pa-md items-start justify-start column">
      <div
        class="q-px-sm q-mb-lg row items-start justify-start"
        style="width: 100%"
      >
        <q-skeleton
          v-if="!courseStore.course.course_name"
          square
          height="150px"
          width="100%"
          class="q-mb-md"
        />
        <div v-else class="col-12 q-mt-sm q-mb-xl">
          <h5 class="q-ma-none text-grey-9">
            <b>Course: {{ courseStore.course.course_name }}</b>
          </h5>
          <h6 class="q-ma-none">
            Passing the quiz earns you a Certificate of Completion. Take your
            time and give it your best shot—good luck!
          </h6>
        </div>
      </div>
      <div class="q-pa-sm" style="width: 100%">
        <div>
          <div class="flex justify-between items-center q-mb-md">
            <h6 class="col-12 q-my-none q-px-sm text-primary">
              LIST OF QUIZZES
            </h6>
            <div class="flex justify-end items-center">
              <!-- <div class="q-mr-md">Search:</div>
              <q-input outlined dense class="bg-white" /> -->
            </div>
          </div>
          <q-table
            flat
            bordered
            separator="cell"
            :rows="quizStore.quizzes"
            :columns="columns"
            row-key="name"
            table-header-class="bg-dark text-white"
            class="sticky-table-header"
            style="height: auto"
            :loading="tblLoadingState"
          >
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <div class="table-menu">
                  <q-btn
                    dense
                    rounded
                    color="primary"
                    label="View"
                    class="q-px-lg"
                    no-caps
                    @click="ViewQuiz(props.row)"
                  />
                </div>
              </q-td>
            </template>
            <!--If table has no data-->

            <template v-slot:no-data>
              <div class="text-center q-pa-md" style="width: 100%">
                No Available Data
              </div>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useCourseStore } from "../../../stores/course-store";
import { useQuizStore } from "../../../stores/quiz-store";
import { onMounted, ref } from "vue";

// Variables
const route = useRoute();
const router = useRouter();
const quizStore = useQuizStore();
const courseStore = useCourseStore();

const courseId = route.params.course_id;

const tblLoadingState = ref(true);

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

// Lifecycle Hooks
onMounted(() => {
  courseStore.fetchCourseData(courseId);
  let response = quizStore.fetchQuizDataByCourse(courseId);
  response.then((data) => {
    tblLoadingState.value = false;
  });
});

// Functions
const ViewQuiz = (row) => {
  router.push({
    name: "Quiz Page",
    params: { quiz_id: row.id },
  });
};
</script>
