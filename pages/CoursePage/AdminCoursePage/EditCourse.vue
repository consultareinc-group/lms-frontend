<template>
  <q-page class="q-pa-md column">
    <page-breadcrumbs
      title="Course Management"
      :items="[
        {
          label: 'Learning Management System',
          to: { name: 'Nav1' },
        },
        {
          label: 'Course Management',
          to: { name: 'Course Management' },
        },
        {
          label: 'Edit Course',
          to: { name: 'Edit Course' },
        },
      ]"
    />
    <div class="col-grow items-start justify-start column">
      <div
        class="bg-white q-my-lg q-py-lg q-px-xl items-start justify-start column"
        style="width: 100%"
      >
        <header class="q-mb-lg row justify-between full-width items-center">
          <div>
            <h6 class="q-ma-none">Edit Course</h6>
            <p class="text-weight-thin">
              Please fill out the required fields
              <span class="text-red">*</span>
            </p>
          </div>
          <div>
            <q-btn
              :to="{ name: 'Add Category' }"
              :loading="btnLoadingState"
              label="Add Category"
              no-caps
              flat
              class="bg-accent text-white q-px-xl"
            />
          </div>
        </header>

        <q-form class="full-width" ref="courseForm" greedy>
          <div class="row full-width no-wrap" style="gap: 20px">
            <div class="full-width">
              <label>Course Name <span class="text-red">*</span></label>
              <q-input
                outlined
                v-model="form.course_name"
                dense
                class="q-mt-sm"
                :rules="[(val) => !!val || 'Field is required']"
                lazy-rules
              />
            </div>
            <div class="full-width">
              <label>Status <span class="text-red">*</span></label>
              <q-select
                outlined
                dense
                v-model="form.status"
                :options="options"
                option-label="name"
                option-value="id"
                map-options
                emit-value
                class="q-mt-sm"
                :rules="[(val) => val === 0 || !!val || 'Field is required']"
                lazy-rules
              />
            </div>
          </div>

          <div class="row full-width no-wrap" style="gap: 20px">
            <div class="full-width">
              <label>Video Embed Link <span class="text-red">*</span></label>
              <q-input
                outlined
                v-model="form.video_link"
                dense
                class="q-mt-sm"
                :rules="[requiredRule, urlRule]"
                lazy-rules
              />
            </div>

            <div class="full-width">
              <label>Category <span class="text-red">*</span></label>
              <q-select
                use-input
                outlined
                dense
                v-model="form.category"
                :options="categoryOptions"
                option-label="category_name"
                option-value="id"
                input-debounce="500"
                hide-selected
                hide-dropdown-icon
                fill-input
                map-options
                emit-value
                @filter="filterCategoryOptions"
                :rules="[(val) => !!val || 'Field is required']"
                lazy-rules
                class="q-mt-sm q-mb-md"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-select>
            </div>
          </div>

          <div>
            <label>Description <span class="text-red">*</span></label>
            <q-input
              type="textarea"
              outlined
              v-model="form.course_description"
              autogrow
              class="q-mt-sm full-height"
              :rules="[(val) => !!val || 'Field is required']"
            />
          </div>
        </q-form>
      </div>
      <q-btn
        @click="saveCourse"
        :loading="btnLoadingState"
        label="Update"
        no-caps
        flat
        class="bg-accent text-white q-px-xl q-mt-lg"
      />
    </div>
  </q-page>
</template>

<script setup>
// Import Vue's reactive utility for managing state
import { onMounted, ref } from "vue";
// Import a breadcrumb component for navigation
import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
// Import the store for managing course data
import { useCourseStore } from "../../../stores/course-store";
// Import Quasar's UI utilities
import { useQuasar } from "quasar";

import { useRoute } from "vue-router";
import { useCategoryStore } from "../../../stores/category-store";

// Variables
// Initialize the course store to manage state and perform actions
const store = useCourseStore();
const categoryStore = useCategoryStore();
// Access Quasar's notification and UI functionalities
const $q = useQuasar();

const route = useRoute();

// Define options for course status (Draft/Publish)
let options = [
  {
    id: 0,
    name: "Draft",
  },
  {
    id: 1,
    name: "Publish",
  },
];

// Define the form's reactive state object for course data
let form = ref({
  course_name: "", // Input for the course name
  video_link: "", // Input for the course video link
  course_description: "", // Input for the course description
  status: "", // Input for the course status (Draft/Publish)
  category: "",
});

const categoryOptions = ref([]);

onMounted(() => {
  getCategories();
  getCourse();
});

// Reference to the form component, used for validation
const courseForm = ref(null);
// Reactive state to manage the loading state of the save button
const btnLoadingState = ref(false);

// Functions
const getCourse = () => {
  store.GetCourse({ id: +route.params.course_id }).then((response) => {
    if (response.status === "success") {
      form.value = response.data;
      form.value.category = getCategoryID(form.value.category_name);
    }
  });
};
const getCategoryID = (categoryName) => {
  const category = categoryOptions.value.find(
    (category) => category.category_name === categoryName
  );
  return category;
};

const getCategories = () => {
  categoryStore
    .GetCategories({ offset: categoryOptions.value.length })
    .then((response) => {
      categoryOptions.value = response.data.sort((a, b) => {
        const nameA = a.category_name.toLowerCase();
        const nameB = b.category_name.toLowerCase();
        const isNameANumeric = !isNaN(nameA[0]);
        const isNameBNumeric = !isNaN(nameB[0]);
        if (isNameANumeric && !isNameBNumeric) return -1;
        if (!isNameANumeric && isNameBNumeric) return 1;
        return nameA.localeCompare(nameB);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const filterCategoryOptions = (val, update) => {
  categoryStore
    .SearchCategories({ keyword: val })
    .then((response) => {
      update(() => {
        categoryOptions.value = response.data.sort((a, b) => {
          const nameA = a.category_name.toLowerCase();
          const nameB = b.category_name.toLowerCase();
          const isNameANumeric = !isNaN(nameA[0]);
          const isNameBNumeric = !isNaN(nameB[0]);
          if (isNameANumeric && !isNameBNumeric) return -1;
          if (!isNameANumeric && isNameBNumeric) return 1;
          return nameA.localeCompare(nameB);
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const requiredRule = (val) => !!val || "Field is required";
const urlRule = (val) =>
  /^(https?:\/\/)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
    val
  ) || "Invalid URL";

// Define the saveCourse function to handle form submission
const saveCourse = () => {
  // Validate the form fields
  courseForm.value.validate().then((success) => {
    if (success) {
      // Indicate the save process is in progress
      btnLoadingState.value = true;

      // remove uncessary properties
      delete form.value.date_time_added;
      delete form.value.date_time_updated;

      const payload = {
        id: +route.params.course_id,
        course_name: form.value.course_name,
        status: form.value.status,
        video_link: form.value.video_link,
        category_id:
          form.value.category && form.value.category.id
            ? form.value.category.id
            : form.value.category,
        course_description: form.value.course_description,
      };

      // Call the store's PostCourse method to save the course data
      store
        .PutCourse(payload)
        .then((response) => {
          // Check if the response indicates success
          const status = Boolean(response.status === "success");

          // Show a notification based on the response status
          $q.notify({
            message: `<p class='q-mb-none'><span class='text-weight-bold'>${
              status ? "Success" : "Fail"
            }!</span>. The record ${
              status ? "has been" : "was not"
            } updated.</p>`,
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
          // Reset the loading state regardless of the response outcome
          btnLoadingState.value = false;
        });
    }
  });
};
</script>

<style scoped>
:deep(.q-textarea .q-field__control) {
  min-height: 200px;
}
</style>
