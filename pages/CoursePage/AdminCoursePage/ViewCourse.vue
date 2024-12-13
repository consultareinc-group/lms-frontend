<template>
  <q-page class="q-pa-md column">
    <page-breadcrumbs
      title="Course Management"
      :items="[
        {
          label: 'Learning Management System',
          // icon: 'home',
          to: { name: 'Nav1' },
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
          :rows="store.Courses"
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
                      <!-- <q-item
                              :to="{ name: 'route-name-here', params: { id: props.row.id } }"
                            > -->
                      <q-item clickable v-close-popup to="">
                        <q-item-section>View</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup to="">
                        <q-item-section>Edit</q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        @click="showArchiveDialog(props.row.id)"
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
  </q-page>
</template>

<script setup>
// Import necessary utilities and components from Vue and external files
import { ref, onMounted, nextTick } from "vue";
import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import { useRouter } from "vue-router";
import { useCourseStore } from "src/resources/lms-frontend/stores/course-store";

// Initialize the Vue Router instance
const router = useRouter();

// Access the course store for managing course-related data
const store = useCourseStore();

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
    name: "date_time_added",
    align: "left",
    style: "width: 100px", // Custom column width
    label: "Date & Time Added",
    field: "date_time_added",
  },
  { name: "action", field: "action" }, // Placeholder for action buttons or controls
];

// Reactive variable to manage the loading state of the table
const tableLoadingState = ref(false);

// Function to fetch the list of courses, recursively fetching until all are loaded
const getCourses = () => {
  store.GetCourses({ offset: store.Courses.length }).then((response) => {
    tableLoadingState.value = false;

    if (response.data.length) {
      getCourses(); // Continue fetching if more data is available
    }
  });
};

// Lifecycle hook to fetch courses when the component is mounted
onMounted(() => {
  tableLoadingState.value = true;
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
    });
  } else {
    store.Courses = []; // Reset course list if no keyword is provided
    getCourses(); // Reload all courses
  }
};

// Reactive variable to manage the visibility state of the alert dialog
let alert = ref(false);

// Function to show an archive dialog with the selected course ID
const showArchiveDialog = (id) => {
  alert.value = true;
  console.log("id ", id); // Log the selected course ID for debugging
};
</script>
