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
        <header class="q-mb-lg">
          <h6 class="q-ma-none">Add Course</h6>
          <p class="text-weight-thin">
            Please fill out the required fields
            <span class="text-red">*</span>
          </p>
        </header>

        <q-form class="row full-width" ref="courseForm" greedy>
          <div class="col-4 q-px-sm">
            <div>
              <label>Course Name <span class="text-red">*</span></label>
              <q-skeleton v-if="!form.course_name" type="QInput" />
              <q-input
                v-else
                outlined
                v-model="form.course_name"
                dense
                class="q-mt-sm"
                :rules="[(val) => !!val || 'Field is required']"
                lazy-rules
              />
            </div>

            <div>
              <label>Status <span class="text-red">*</span></label>
              <q-skeleton v-if="!form.status" type="QInput" />
              <q-select
                v-else
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

          <div class="col-4 q-px-sm">
            <label>Video Embed Link <span class="text-red">*</span></label>
            <q-skeleton v-if="!form.video_link" type="QInput" />
            <q-input
              v-else
              outlined
              v-model="form.video_link"
              dense
              class="q-mt-sm"
              :rules="[(val) => !!val || 'Field is required']"
              lazy-rules
            />
          </div>

          <div class="col-4 q-px-sm">
            <label>Description <span class="text-red">*</span></label>
            <q-skeleton
              v-if="!form.course_description"
              height="150px"
              type="QInput"
            />
            <q-input
              v-else
              type="textarea"
              outlined
              v-model="form.course_description"
              dense
              class="q-mt-sm"
              :rules="[(val) => !!val || 'Field is required']"
              lazy-rules
            />
          </div>
        </q-form>
      </div>
      <q-btn
        @click="saveCourse"
        :loading="btnLoadingState"
        label="Save"
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
import { useCourseStore } from "src/resources/lms-frontend/stores/course-store";
// Import Quasar's UI utilities
import { useQuasar } from "quasar";

import { useRoute } from "vue-router";

// Initialize the course store to manage state and perform actions
const store = useCourseStore();
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
});

onMounted(() => {
  store.GetCourse({ id: route.params.id }).then((response) => {
    if (response.status === "success") {
      if (response.data.length) {
        form.value = response.data[0];
      }
    }
  });
});

// Reference to the form component, used for validation
const courseForm = ref(null);
// Reactive state to manage the loading state of the save button
const btnLoadingState = ref(false);

// Define the saveCourse function to handle form submission
const saveCourse = () => {
  // Validate the form fields
  courseForm.value.validate().then((success) => {
    if (success) {
      // Indicate the save process is in progress
      btnLoadingState.value = true;

      // Call the store's PostCourse method to save the course data
      store
        .PostCourse(form.value)
        .then((response) => {
          // Check if the response indicates success
          const status = Boolean(response.status === "success");

          // Show a notification based on the response status
          $q.notify({
            message: `<p class='q-mb-none'><span class='text-weight-bold'>${
              status ? "Success" : "Fail"
            }!</span>. The record ${
              status ? "has been" : "was not"
            } added.</p>`,
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

          // Reset the form fields if the save was successful
          if (status) {
            form.value = {
              course_name: "",
              video_link: "",
              course_description: "",
              status: "",
            };
          }
        })
        .finally(() => {
          // Reset the loading state regardless of the response outcome
          btnLoadingState.value = false;
        });
    }
  });
};
</script>
