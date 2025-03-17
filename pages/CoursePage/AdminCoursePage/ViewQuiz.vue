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
          to: {
            name: 'View Quiz',
            params: {
              course_id: route.params.course_id,
              quiz_id: route.params.quiz_id,
            },
          },
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
              <q-skeleton v-if="!quiz.quiz_name" square />
              <p v-else class="q-mb-sm text-weight-light">
                {{ questions.length }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quizzes -->
      <div
        class="bg-white q-my-lg q-py-md q-px-lg items-start justify-start column"
        style="width: 100%"
      >
        <div class="flex justify-between items-center full-width q-mb-lg">
          <h6 class="q-ma-none text-primary text-weight-bold q-px-sm">
            Questions
          </h6>
          <q-btn
            label="Add New"
            no-caps
            flat
            class="bg-primary text-white"
            :to="{
              name: 'Add Question',
              params: { quiz_id: route.params.quiz_id },
            }"
          />
        </div>

        <div class="full-width">
          <div class="flex justify-end q-mb-md">
            <div class="flex justify-end items-center">
              <div class="q-mr-md">Search:</div>
              <q-input
                outlined
                dense
                class="bg-white"
                debounce="1000"
                v-model="search_keyword"
                @update:model-value="search()"
              />
            </div>
          </div>
          <q-table
            flat
            bordered
            :rows="questions"
            :columns="columns"
            row-key="id"
            table-header-class="bg-dark text-white"
            class="sticky-table-header"
            :loading="tableLoadingState"
          >
            <template v-slot:body-cell-number="props">
              <q-td :props="props">{{ props.pageIndex + 1 }}</q-td>
            </template>

            <template v-slot:body-cell-choices="props">
              <q-td :props="props">
                <div v-for="(choice, index) in props.row.choices" :key="index">
                  <span
                    >{{ alphabet[index] }}. {{ choice.choice_text }}
                    <q-icon name="check" color="green" v-if="choice.is_correct"
                  /></span>
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <div class="table-menu">
                  <q-btn dense icon="more_vert" flat round>
                    <q-menu style="width: 100px">
                      <q-list>
                        <q-item
                          clickable
                          v-close-popup
                          :to="{
                            name: 'Edit Question',
                            params: {
                              course_id: route.params.course_id,
                              quiz_id: route.params.quiz_id,
                              question_id: props.row.id,
                            },
                          }"
                        >
                          <q-item-section>Edit</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup>
                          <q-item-section>Archive</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
              </q-td>
            </template>
          </q-table>
          <q-dialog v-model="alert">
            <q-card class="q-px-xl relative-position">
              <q-icon
                name="cancel"
                color="grey"
                size="sm"
                class="absolute-top-right q-mt-sm q-mr-sm cursor-pointer"
                @click="alert = false"
              />
              <q-card-section class="text-center q-mt-lg">
                <!-- <q-icon name="delete" color="red" size="lg" /> -->
                <q-icon name="archive" color="orange-10" size="lg" />
                <!-- <div class="text-h6 text-weight-bold">Delete Confirmation</div> -->
                <div class="text-h6 text-weight-bold">Archive Confirmation</div>
              </q-card-section>

              <q-card-section class="q-pt-none text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit?
              </q-card-section>

              <q-card-section class="q-pt-none text-center">
                <span class="text-bold">Code: </span> CD-100001
              </q-card-section>

              <q-card-section class="flex justify-center q-my-lg">
                <q-btn
                  flat
                  no-caps
                  label="Cancel"
                  class="border-000000-all q-px-lg"
                  v-close-popup
                />
                <div class="q-mx-md"></div>
                <q-btn
                  flat
                  no-caps
                  label="Confirm"
                  class="bg-accent text-white q-px-lg"
                />
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>
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
  { name: "number", label: "No.", align: "left", field: "number" },
  {
    name: "question_text",
    align: "left",
    label: "Question",
    field: "question_text",
    style: "width: 400px",
  },
  {
    name: "choices",
    align: "left",
    label: "Choices",
    field: "choices",
  },
  { name: "action", field: "action" },
];

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

const quiz = ref({
  id: "",
  quiz_name: "",
  passing_percentage: "",
  date_time_added: "",
  date_time_updated: "",
  id: "",
});

const questions = ref([]);

// Reactive variable to manage the loading state of the table
const tableLoadingState = ref(false);

// Function to fetch the list of questions, recursively fetching until all are loaded
const getQuestions = () => {
  store
    .GetQuestions({
      offset: questions.value.length,
      quiz_id: route.params.quiz_id,
    })
    .then((response) => {
      tableLoadingState.value = false;
      if (response.status === "success") {
        response.data.forEach((data) => {
          questions.value.push(data);
        });
      }
    });
};

onMounted(() => {
  store.GetQuiz({ id: route.params.quiz_id }).then((response) => {
    if (response.status === "success") {
      quiz.value = response.data;
    }
  });

  tableLoadingState.value = true;
  // reset question list on page render
  getQuestions();
});

// Reactive variable for handling search keyword input
let search_keyword = ref("");

// Function to search for questions based on the search keyword
const search = () => {
  tableLoadingState.value = true;
  if (search_keyword.value) {
    store
      .SearchQuestions({
        keyword: search_keyword.value,
        quiz_id: route.params.quiz_id,
      })
      .then((response) => {
        tableLoadingState.value = false;
        if (response.status === "success") {
          questions.value = response.data;
        }
      });
  } else {
    questions.value = []; // Reset course list if no keyword is provided
    getQuestions(); // Reload all questions
  }
};

// Reactive variable to manage the visibility state of the alert dialog
let alert = ref(false);

// Function to show an archive dialog with the selected course ID
const showArchiveDialog = (id) => {
  alert.value = true;
};
</script>
