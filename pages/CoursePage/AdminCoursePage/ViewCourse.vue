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
      ]"
    />
    <div>
      <div class="q-mb-lg flex justify-end">
        <q-btn
          label="Add New"
          no-caps
          flat
          class="bg-primary text-white"
          :to="{ name: 'Add Course' }"
        />
      </div>
      <div>
        <div class="flex justify-end q-mb-md">
          <div class="flex justify-end items-center">
            <div class="q-mr-md">Search:</div>
            <q-input
              v-model="search_keyword"
              outlined
              dense
              class="bg-white"
              debounce="1000"
              @update:model-value="search()"
            />
          </div>
        </div>
        <q-table
          flat
          bordered
          :rows="courses"
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
                          params: { course_id: props.row.id },
                        }"
                      >
                        <q-item-section>View</q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        :to="{
                          name: 'Edit Course',
                          params: { course_id: props.row.id },
                        }"
                      >
                        <q-item-section>Edit</q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        @click="showArchiveDialog(props.row)"
                      >
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
              Are you sure you want to archive the
              <b>{{ courseDetails.course_name }}</b
              >?
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
                @click="archiveCourse()"
                :loading="archiveLoadingState"
              />
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script setup>
// Import necessary utilities and components from Vue and external files
import { ref, onMounted, nextTick } from "vue";
import { date } from "quasar";
import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import { useRouter } from "vue-router";
import { useCourseStore } from "../../../stores/course-store";
import { useQuasar } from "quasar";

// Initialize the Vue Router instance
const router = useRouter();
const $q = useQuasar();

// Access the course store for managing course-related data
const store = useCourseStore();

const status = ["Draft", "Publish"];

// Define the table columns with configurations for name, alignment, and formatting
const columns = [
  {
    name: "id",
    required: true,
    label: "Course ID",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortOrder: "da", // Sort order for the column
  },
  {
    name: "course_name",
    align: "left",
    label: "Course Name",
    field: "course_name",
  },
  {
    name: "status",
    align: "left",
    label: "Status",
    field: (row) => status[row.status],
  },
  {
    name: "date_time_added",
    align: "left",
    style: "width: 100px", // Custom column width
    label: "Date Added",
    field: (row) => date.formatDate(row.date_time_added, "YYYY-MM-DD"),
  },
  { name: "action", field: "action" }, // Placeholder for action buttons or controls
];

const courses = ref([]);

// Reactive variable to manage the loading state of the table
const tableLoadingState = ref(false);

// Function to fetch the list of courses, recursively fetching until all are loaded
const getCourses = () => {
  store.GetCourses({ offset: courses.value.length }).then((response) => {
    tableLoadingState.value = false;
    if (response.status === "success") {
      response.data.forEach((data) => {
        courses.value.push(data);
      });

      if (response.data.length) {
        getCourses(); // Continue fetching if more data is available
      }
    }
  });
};

// Lifecycle hook to fetch courses when the component is mounted
onMounted(() => {
  tableLoadingState.value = true;
  // reset course list on page render
  getCourses();
});

// Reactive variable for handling search keyword input
let search_keyword = ref("");

// Function to search for courses based on the search keyword
const search = () => {
  tableLoadingState.value = true;
  if (search_keyword.value) {
    store.SearchCourses({ keyword: search_keyword.value }).then((response) => {
      tableLoadingState.value = false;
      if (response.status === "success") {
        courses.value = response.data;
      }
    });
  } else {
    courses.value = []; // Reset course list if no keyword is provided
    getCourses(); // Reload all courses
  }
};

// Reactive variable to manage the visibility state of the alert dialog
let alert = ref(false);
const courseDetails = ref({});
// Function to show an archive dialog with the selected course ID
const showArchiveDialog = (course) => {
  alert.value = true;
  courseDetails.value = course;
};

const archiveLoadingState = ref(false);
const archiveCourse = () => {
  archiveLoadingState.value = true;
  store
    .ArchiveCourse({ id: courseDetails.value.id })
    .then((response) => {
      // Check if the response indicates success
      const status = Boolean(response.status === "success");

      if (status) {
        let index = courses.value.findIndex(
          (course) => course.id === courseDetails.value.id
        );
        index != -1 && courses.value.splice(index, 1);
      }

      // Show a notification based on the response status
      $q.notify({
        message: `<p class='q-mb-none'><span class='text-weight-bold'>${
          status ? "Success" : "Fail"
        }!</span>. The course ${status ? "has been" : "was not"} archived.</p>`,
        color: `${status ? "green-2" : "red-2"}`, // Set notification color
        position: "top-right", // Notification position
        textColor: `${status ? "green" : "red"}`, // Set text color
        actions: [
          {
            icon: "close", // Close icon
            color: `${status ? "green" : "red"}`, // Icon color
            round: true, // Rounded icon
          },
        ],
        html: true, // Enable HTML content
      });
    })
    .finally(() => {
      archiveLoadingState.value = false;
      alert.value = false;
    });
};
</script>
