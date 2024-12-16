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
          to: { name: 'View Course Details' },
        },
      ]"
    />
    <div class="col-grow items-start justify-start column">
      <div
        class="bg-white q-my-lg q-py-lg q-px-xl items-start justify-start column"
        style="width: 100%"
      >
        <header>
          <h6 class="q-mb-lg q-mt-none">Course Details</h6>
        </header>
        <div class="q-px-sm">
          <p class="q-mb-sm">Status:</p>
          <q-skeleton v-if="course.status === ''" square />
          <p v-else class="q-mb-sm text-weight-light">
            {{ status[course.status] }}
          </p>
        </div>
        <div class="row" style="width: 100%">
          <!---->
          <div class="col-4 q-px-sm">
            <div class="q-my-md">
              <p class="q-mb-sm">Course ID:</p>
              <q-skeleton v-if="!course.id" square />
              <p v-else class="q-mb-sm text-weight-light">{{ course.id }}</p>
            </div>
            <!---->
            <div class="q-my-md">
              <p class="q-mb-sm">Date Added:</p>
              <q-skeleton v-if="!course.date_time_added" square />
              <p v-else class="q-mb-sm text-weight-light">
                {{ date.formatDate(course.date_time_added, "YYYY-MM-DD") }}
              </p>
            </div>
            <!---->
            <div class="q-my-md">
              <p class="q-mb-sm">No of Quizzes:</p>
              <p class="q-mb-sm text-weight-light">3</p>
            </div>
          </div>
          <!---->
          <div class="col-4 q-px-sm">
            <div class="q-my-md">
              <p class="q-mb-sm">Course Name:</p>
              <q-skeleton v-if="!course.course_name" square />
              <p v-else class="q-mb-sm text-weight-light">
                {{ course.course_name }}
              </p>
            </div>
            <!---->
            <div class="q-my-md">
              <p class="q-mb-sm">Last Updated:</p>
              <q-skeleton v-if="!course.date_time_updated" square />
              <p v-else class="q-mb-sm text-weight-light">
                {{ course.date_time_updated }}
              </p>
            </div>
            <!---->
            <div class="q-my-md">
              <p class="q-mb-sm">Video Embed Link:</p>
              <q-skeleton v-if="!course.video_link" square />
              <p v-else class="q-mb-sm text-weight-light">
                {{ course.video_link }}
              </p>
            </div>
          </div>
          <!---->
          <div class="col-4 q-px-sm q-my-md">
            <p class="q-mb-sm">Description:</p>
            <q-skeleton v-if="!course.course_description" height="150px" />
            <p v-else class="q-mb-sm text-weight-light">
              {{ course.course_description }}
            </p>
          </div>
        </div>
      </div>
      <div
        class="col-grow items-start justify-start column"
        style="width: 100%"
      >
        <h5 class="q-mb-none q-px-sm text-primary">LIST OF QUIZZES</h5>
        <div
          class="q-px-sm q-mb-lg row items-end justify-end"
          style="width: 100%"
        >
          <q-btn
            :to="{ name: 'Add Quiz' }"
            label="Add New"
            no-caps
            flat
            class="bg-primary text-white"
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
            :rows="quizzes"
            :columns="columns"
            row-key="id"
            table-header-class="bg-dark text-white"
            class="sticky-table-header"
            :loading="tableLoadingState"
          >
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
                            name: 'View Course Details',
                            params: { course_id: props.row.course_id },
                          }"
                        >
                          <q-item-section>View</q-item-section>
                        </q-item>
                        <q-item
                          clickable
                          v-close-popup
                          :to="{
                            name: 'Edit Course',
                            params: { id: props.row.id },
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
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { date } from "quasar";
import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import { useRouter, useRoute } from "vue-router";
import { onMounted } from "vue";
import { useCourseStore } from "../../../stores/course-store";

const route = useRoute();
const router = useRouter();
const store = useCourseStore();

let course = ref({
  id: "",
  course_name: "",
  course_description: "",
  video_link: "",
  status: "",
  date_time_added: "",
  date_time_updated: "",
});

const status = ["Draft", "Publish"];

// Reactive variable to manage the loading state of the table
const tableLoadingState = ref(false);

// Function to fetch the list of quizzes, recursively fetching until all are loaded
const getQuizzes = () => {
  store.GetQuizzes({ offset: quizzes.value.length }).then((response) => {
    tableLoadingState.value = false;
    if (response.status === "success") {
      response.data.forEach((data) => {
        quizzes.value.push(data);
      });

      if (response.data.length) {
        getQuizzes(); // Continue fetching if more data is available
      }
    }
  });
};

onMounted(() => {
  store.GetCourse({ id: route.params.course_id }).then((response) => {
    if (response.status === "success") {
      if (response.data.length) {
        course.value = response.data[0];
      }
    }
  });

  tableLoadingState.value = true;
  // reset course list on page render
  getQuizzes();
});

// Reactive variable for handling search keyword input
let search_keyword = ref("");

// Function to search for quizzes based on the search keyword
const search = () => {
  tableLoadingState.value = true;
  if (search_keyword.value) {
    store.SearchQuizzes({ keyword: search_keyword.value }).then((response) => {
      tableLoadingState.value = false;
      if (response.status === "success") {
        quizzes.value = response.data;
      }
    });
  } else {
    quizzes.value = []; // Reset course list if no keyword is provided
    getQuizzes(); // Reload all quizzes
  }
};

const columns = [
  {
    name: "id",
    required: true,
    label: "Quiz ID",
    align: "left",
    field: "id",
    sortable: true,
    style: "width: 50px",
  },
  {
    name: "quiz_name",
    align: "center",
    label: "Quiz Name",
    field: "quiz_name",
  },
  {
    name: "date_time_added",
    align: "left",
    label: "Date Added",
    field: "date_time_added",
    style: "width: 100px",
  },
  { name: "action", field: "action" },
];

const quizzes = ref([]);

// Reactive variable to manage the visibility state of the alert dialog
let alert = ref(false);

// Function to show an archive dialog with the selected course ID
const showArchiveDialog = (id) => {
  alert.value = true;
  console.log("id ", id); // Log the selected course ID for debugging
};
</script>
