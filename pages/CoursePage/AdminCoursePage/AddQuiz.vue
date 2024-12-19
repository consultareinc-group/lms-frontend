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
          label: 'Add Quiz',
          // icon: 'home',
          to: { name: 'Add Quiz' },
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
        <h5 class="q-ma-none q-mb-lg">{{ store.Course.name }}</h5>
        <hr />
        <header class="q-mb-lg">
          <h6 class="q-ma-none q-mt-lg">Add Quiz</h6>
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
              <q-input
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
            <q-input
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
        @click="saveQuiz()"
        :loading="btnLoadingState"
        label="Save"
        no-caps
        flat
        class="bg-accent text-white q-px-xl q-mt-lg"
      />
    </q-form>
  </div>
</template>

<script setup>
import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import { ref } from "vue";
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

// Reference to the form component, used for validation
const quizForm = ref(null);
// Reactive state to manage the loading state of the save button
const btnLoadingState = ref(false);

// Define the saveQuiz function to handle form submission
const saveQuiz = () => {
  // Validate the form fields
  quizForm.value.validate().then((success) => {
    if (success) {
      // Indicate the save process is in progress
      btnLoadingState.value = true;

      // bind course_id to the quiz data
      form.value.course_id = store.Course.id;
      // Call the store's PostCourse method to save the course data
      store
        .PostQuiz(form.value)
        .then((response) => {
          // Check if the response indicates success
          const status = Boolean(response.status === "success");

          // Show a notification based on the response status
          $q.notify({
            message: `<p class='q-mb-none'><span class='text-weight-bold'>${
              status ? "Success" : "Fail"
            }!</span>. The quiz ${status ? "has been" : "was not"} added.</p>`,
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
            router.push({
              name: "Add Question",
            });
            store.Quiz.id = response.data.id;
            store.Quiz.name = form.value.quiz_name;
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
