<template>
  <div class="q-pa-md column">
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
          label: 'Edit Quiz',
          // icon: 'home',
          to: {
            name: 'Edit Quiz',
            params: {
              course_id: route.params.course_id,
              quiz_id: route.params.quiz_id,
            },
          },
        },
      ]"
    />
    <q-form
      class="col-grow items-start justify-start column"
      ref="quizForm"
      greedy
    >
      <div
        class="bg-white q-my-lg q-py-lg q-px-xl items-start justify-start full-width"
      >
        <!-- <h5 class="q-ma-none q-mb-lg">{{ store.Course.name }}</h5> -->
        <hr />
        <header class="q-mb-lg">
          <h6 class="q-ma-none q-mt-lg">Edit Quiz</h6>
          <p class="text-weight-thin">
            Please fill out the required fields
            <span class="text-red">*</span>
          </p>
        </header>
        <!---->
        <div class="row full-width">
          <!---->
          <div class="col-6 q-px-sm">
            <div>
              <label>Quiz Name <span class="text-red">*</span></label>
              <q-skeleton v-if="!form.quiz_name" type="QInput" />
              <q-input
                v-else
                outlined
                v-model="form.quiz_name"
                dense
                class="q-mt-sm"
                :rules="[(val) => !!val || 'Field is required']"
                lazy-rules
              />
            </div>
            <!---->
          </div>
          <!---->
          <div class="col-6 q-px-sm">
            <label>Passing Percentage <span class="text-red">*</span></label>
            <q-skeleton v-if="!form.passing_percentage" type="QInput" />
            <q-input
              v-else
              outlined
              v-model="form.passing_percentage"
              type="number"
              dense
              class="q-mt-sm"
              :rules="[
                (val) => !!val || 'Field is required',
                (val) => val >= 1 || 'Value must be at least 1',
                (val) => val <= 100 || 'Value must not exceed 100',
              ]"
              :min="1"
              :max="100"
              lazy-rules
            />
          </div>
        </div>
      </div>

      <!-- Button -->
      <q-btn
        @click="updateQuiz()"
        :loading="btnLoadingState"
        label="Update"
        no-caps
        flat
        class="bg-accent text-white q-px-xl q-mt-lg"
      />
    </q-form>
  </div>
</template>

<script setup>
import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCourseStore } from "../../../stores/course-store";
// Import Quasar's UI utilities
import { useQuasar } from "quasar";

const route = useRoute();
const router = useRouter();
const store = useCourseStore();
// Access Quasar's notification and UI functionalities
const $q = useQuasar();

let form = ref({
  quiz_name: "",
  passing_percentage: "",
});

onMounted(() => {
  store.GetQuiz({ id: route.params.quiz_id }).then((response) => {
    if (response.status === "success") {
      form.value = response.data;
    }
  });
});

// Reference to the form component, used for validation
const quizForm = ref(null);
// Reactive state to manage the loading state of the save button
const btnLoadingState = ref(false);

// Define the updateQuiz function to handle form submission
const updateQuiz = () => {
  // Validate the form fields
  quizForm.value.validate().then((success) => {
    if (success) {
      // Indicate the save process is in progress
      btnLoadingState.value = true;

      // remove unecessary properties
      delete form.value.course_id;
      delete form.value.date_time_added;
      delete form.value.date_time_updated;

      // Call the store's PostCourse method to save the course data
      store
        .PutQuiz(form.value)
        .then((response) => {
          // Check if the response indicates success
          const status = Boolean(response.status === "success");

          // Show a notification based on the response status
          $q.notify({
            message: `<p class='q-mb-none'><span class='text-weight-bold'>${
              status ? "Success" : "Fail"
            }!</span>. The quiz ${
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
