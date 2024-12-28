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
        {
          label: 'Edit Question',
          // icon: 'home',
          to: { name: 'Edit Question' },
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
        <q-skeleton v-if="!store.Quiz.name" square height="40px" />
        <h5 v-else class="q-ma-none q-mb-lg">{{ store.Quiz.name }}</h5>
        <hr />
        <header class="q-mb-lg q-mt-lg">
          <h6 class="q-ma-none">Edit Question</h6>
          <p class="text-weight-thin">
            Please fill out the required fields
            <span class="text-red">*</span>
          </p>
        </header>
        <!---->
        <div class="q-mb-lg">
          <div class="row full-width">
            <!---->
            <div class="col-12 q-px-sm q-mb-md">
              <label>Question <span class="text-red">*</span></label>
              <q-skeleton
                v-if="!form.question_text"
                square
                height="150px"
                width="100%"
              />
              <q-input
                v-else
                type="textarea"
                outlined
                v-model="form.question_text"
                dense
                class="q-mt-sm"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
            <!---->
            <!-- <q-skeleton v-if="!form.choices.length" square height="150px" />
            <div v-else></div> -->
            <div v-if="!form.choices.length" class="full-width">
              <label>Choice <span class="text-red">*</span></label>
              <div class="row q-pa-sm full-width">
                <div class="col-5 q-pr-md">
                  <q-skeleton square height="150px" />
                </div>
                <!---->
                <div class="col-6 q-pr-md items-center">
                  <q-skeleton square height="150px" />
                </div>
              </div>
            </div>
            <div v-else class="full-width">
              <div
                v-for="(choice, choice_index) in form.choices"
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
                    @click="removeChoice(choice_index)"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- Button -->
          <q-btn
            label="Add Choice"
            no-caps
            flat
            class="bg-primary text-white q-mt-lg"
            @click="addChoice()"
          />
        </div>
      </div>
      <!-- <q-btn
        label="Add Question"
        no-caps
        flat
        class="bg-primary text-white"
        @click="addQuestion()"
      /> -->

      <!-- Button -->
      <q-btn
        @click="updateQuestion"
        :loading="btnLoadingState"
        label="Update"
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
import { onMounted, ref } from "vue";
import { useCourseStore } from "../../../stores/course-store";
// Import Quasar's UI utilities
import { useQuasar } from "quasar";

const store = useCourseStore();
const route = useRoute();
const router = useRouter();
// Access Quasar's notification and UI functionalities
const $q = useQuasar();

let form = ref({
  question_text: "",
  choices: [],
});

onMounted(() => {
  store.GetQuiz({ id: route.params.quiz_id }).then((response) => {
    if (response.status === "success") {
      store.Quiz.name = response.data.quiz_name;
    }
  });

  store
    .GetQuestion({
      id: route.params.question_id,
    })
    .then((response) => {
      if (response.status === "success") {
        form.value = response.data[0];
        if (!response.data[0].choices.length) {
          form.value.choices = [
            { choice_text: "", explanation: "", is_correct: 0 },
            { choice_text: "", explanation: "", is_correct: 0 },
            { choice_text: "", explanation: "", is_correct: 0 },
          ];
        }
      }
    });
});

const addChoice = () => {
  form.value.choices.push({
    choice_text: "",
    explanation: "",
    is_correct: 0,
  });
};

const removeChoice = (choice_index) => {
  form.value.choices.splice(choice_index, 1);
};

// Reference to the form component, used for validation
const questionForm = ref(null);
// Reactive state to manage the loading state of the save button
const btnLoadingState = ref(false);

// Define the updateQuestion function to handle form submission
const updateQuestion = () => {
  // Validate the form fields
  questionForm.value.validate().then((success) => {
    if (success) {
      // Indicate the save process is in progress
      btnLoadingState.value = true;

      // Call the store's PutQuestion method to update the question data
      store
        .PutQuestion(form.value)
        .then((response) => {
          // Check if the response indicates success
          const status = Boolean(response.status === "success");

          // Show a notification based on the response status
          $q.notify({
            message: `<p class='q-mb-none'><span class='text-weight-bold'>${
              status ? "Success" : "Fail"
            }!</span>. The question ${
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
