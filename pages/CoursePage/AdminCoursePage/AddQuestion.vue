<template>
  <q-page class="q-pa-md column">
    <page-breadcrumbs
      title="Course Management"
      :items="[
        { label: 'Learning Management System', to: { name: 'Nav1' } },
        { label: 'Course Management', to: { name: 'Course Management' } },
        {
          label: 'Add Question',
          to: {
            name: 'Add Question',
          },
        },
      ]"
    />
    <q-form
      class="col-grow items-start justify-start column"
      ref="questionForm"
      greedy
    >
      <div
        class="bg-white q-my-lg q-py-lg q-px-xl items-start justify-start"
        style="width: 100%"
      >
        <h5 class="q-ma-none q-mb-lg">{{ store.Quiz.name }}</h5>
        <hr />
        <header class="q-mb-lg q-mt-lg">
          <h6 class="q-ma-none">Add Question</h6>
          <p class="text-weight-thin">
            Please fill out the required fields
            <span class="text-red">*</span>
          </p>
        </header>
        <!---->
        <div
          v-for="(question, question_index) in form.questions"
          :key="question_index"
          class="q-mb-lg"
        >
          <div class="row full-width">
            <div class="flex justify-end full-width">
              <q-icon
                v-if="question_index !== 0"
                size="sm"
                name="delete"
                color="red-8"
                class="q-mx-sm cursor-pointer"
                @click="removeQuestion(question_index)"
              />
            </div>
            <!---->
            <div class="col-12 q-px-sm q-mb-md">
              <label
                >Question {{ question_index + 1 }}
                <span class="text-red">*</span></label
              >
              <q-input
                type="textarea"
                outlined
                v-model="question.question_text"
                dense
                class="q-mt-sm"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
            <!---->
            <div
              v-for="(choice, choice_index) in question.choices"
              :key="choice_index"
              class="row q-pa-sm"
              style="width: 100%"
            >
              <div class="col-5 q-pr-md">
                <label
                  >Choice {{ choice_index + 1 }}
                  <span class="text-red">*</span></label
                >
                <q-input
                  type="textarea"
                  outlined
                  v-model="choice.choice_text"
                  dense
                  class="q-mt-sm q-pb-none"
                  :rules="[(val) => !!val || 'Field is required']"
                />
                <!---->
                <div>
                  <q-checkbox
                    v-model="choice.is_correct"
                    :true-value="1"
                    :false-value="0"
                    label="Is Correct"
                  />
                </div>
              </div>
              <!---->
              <div class="col-6 q-pr-md">
                <label>Explanation</label>
                <q-input
                  type="textarea"
                  outlined
                  v-model="choice.explanation"
                  dense
                  class="q-mt-sm"
                />
              </div>
              <!---->
              <div class="col-1 flex items-center justify-center">
                <q-icon
                  v-if="choice_index >= 2"
                  size="sm"
                  name="delete"
                  color="red-8"
                  class="q-mx-sm cursor-pointer"
                  @click="removeChoice(question_index, choice_index)"
                />
              </div>
            </div>
          </div>
          <!-- Button -->
          <q-btn
            label="Add Choice"
            no-caps
            flat
            class="bg-primary text-white q-mt-lg"
            @click="addChoice(question_index)"
          />

          <hr
            class="q-mt-lg"
            v-if="
              form.questions.length >= 2 &&
              form.questions.length - 1 != question_index
            "
          />
        </div>
      </div>
      <q-btn
        label="Add Question"
        no-caps
        flat
        class="bg-primary text-white"
        @click="addQuestion()"
      />

      <!-- Button -->
      <q-btn
        @click="saveQuestion"
        :loading="btnLoadingState"
        label="Save"
        no-caps
        flat
        class="bg-accent text-white q-px-xl q-mt-xl"
      />
    </q-form>
  </q-page>
</template>

<script setup>
import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { useCourseStore } from "../../../stores/course-store";
// Import Quasar's UI utilities
import { useQuasar } from "quasar";

const store = useCourseStore();
const route = useRoute();
const router = useRouter();
// Access Quasar's notification and UI functionalities
const $q = useQuasar();

let form = ref({
  questions: [
    {
      question_text: "",
      choices: [
        { choice_text: "", explanation: "", is_correct: 0 },
        { choice_text: "", explanation: "", is_correct: 0 },
        { choice_text: "", explanation: "", is_correct: 0 },
      ],
    },
  ],
});

const addQuestion = () => {
  form.value.questions.push({
    question_text: "",
    choices: [
      { choice_text: "", explanation: "", is_correct: 0 },
      { choice_text: "", explanation: "", is_correct: 0 },
      { choice_text: "", explanation: "", is_correct: 0 },
    ],
  });
};

const removeQuestion = (index) => {
  form.value.questions.splice(index, 1);
};

const addChoice = (index) => {
  form.value.questions[index].choices.push({
    choice_text: "",
    explanation: "",
    is_correct: false,
  });
};

const removeChoice = (question_index, choice_index) => {
  form.value.questions[question_index].choices.splice(choice_index, 1);
};

// Reference to the form component, used for validation
const questionForm = ref(null);
// Reactive state to manage the loading state of the save button
const btnLoadingState = ref(false);

// Define the saveQuestion function to handle form submission
const saveQuestion = () => {
  // Validate the form fields
  questionForm.value.validate().then((success) => {
    if (success) {
      // Indicate the save process is in progress
      btnLoadingState.value = true;

      // bind course_id to the quiz data
      form.value.quiz_id = store.Quiz.id;
      // Call the store's PostCourse method to save the course data
      store
        .PostQuestion(form.value)
        .then((response) => {
          // Check if the response indicates success
          const status = Boolean(response.status === "success");

          // Show a notification based on the response status
          $q.notify({
            message: `<p class='q-mb-none'><span class='text-weight-bold'>${
              status ? "Success" : "Fail"
            }!</span>. The question ${
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
            router.push({
              name: "View Course Details",
              params: { course_id: store.Course.id },
            });
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
