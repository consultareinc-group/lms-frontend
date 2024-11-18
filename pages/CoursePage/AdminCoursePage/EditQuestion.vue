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
        {
          label: 'View Course Details',
          // icon: 'home',
          to: { name: 'View Course Details' },
        },
        {
          label: 'Edit Quiz',
          // icon: 'home',
          to: { name: 'Edit Quiz' },
        },
        {
          label: 'Edit Question',
          // icon: 'home',
          to: { name: 'Edit Question' },
        },
      ]"
    />
    <div class="col-grow items-start justify-start column">
      <div
        class="bg-white q-my-lg q-py-lg q-px-xl items-start justify-start column"
        style="width: 100%"
      >
        <header class="q-mb-lg">
          <h6 class="q-ma-none">Question Details</h6>
          <p class="text-weight-thin">
            Please fill out the required fields
            <span class="text-red">*</span>
          </p>
        </header>
        <!---->
        <div class="row" style="width: 100%">
          <!---->
          <div class="col-12 q-px-sm q-mb-md">
            <label>Question <span class="text-red">*</span></label>
            <q-input
              type="textarea"
              outlined
              v-model="form.question"
              dense
              class="q-mt-sm"
              :rules="[(val) => !!val || 'Field is required']"
            />
          </div>
          <!---->
          <div
            v-for="(choice, index) in form.choices"
            :key="index"
            class="row q-pa-sm"
            style="width: 100%"
          >
            <div class="col-5 q-pr-md">
              <label
                >Choice {{ index + 1 }} <span class="text-red">*</span></label
              >
              <q-input
                type="textarea"
                outlined
                v-model="choice.text"
                dense
                class="q-mt-sm q-pb-none"
                :rules="[(val) => !!val || 'Field is required']"
              />
              <!---->
              <div>
                <q-checkbox v-model="choice.isCorrect" label="Is Correct" />
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
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
            <!---->
            <div class="col-1 flex items-center justify-center">
              <q-icon
                size="2.5rem"
                name="delete"
                color="red-8"
                class="q-mx-sm"
                @click="removeChoice(index)"
                style="cursor: pointer"
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
          @click="addChoice"
        />
      </div>

      <!--Success modal-->
      <!-- <div
        style="width: 100%; border: solid 1px green"
        class="items-center justify-between row bg-green-2 q-pa-md rounded-borders"
        v-if="isSuccessModalOpen"
      >
        <p class="q-mb-none text-green">
          <span class="text-weight-bold">Success!</span> The record has been
          saved.
        </p>
        <q-icon
          class="text-green"
          name="close"
          @click="handleCloseSuccesModal"
          style="cursor: pointer"
        />
      </div> -->

      <!-- Button -->
      <q-btn
        @click="handleSave"
        label="Save"
        no-caps
        flat
        class="bg-accent text-white q-px-xl q-mt-lg"
      />
    </div>
  </q-page>
</template>

<script setup>
import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import { useNotification } from "../Composables/UseNotification";
import { ref } from "vue";

const { showNotif } = useNotification();

function handleSave() {
  showNotif(
    "<p class='q-mb-none text-green'><span class='text-weight-bold'>Success</span>. The record has been updated.</p>",
    "green-2"
  );
}

let form = ref({
  question: "Question 1",
  choices: [
    { text: "Choices 1", explanation: "Explanation 1", isCorrect: false },
    { text: "Choices 2", explanation: "Explanation 2", isCorrect: false },
    { text: "Choices 3", explanation: "Explanation 3", isCorrect: false },
  ],
});

const addChoice = () => {
  form.value.choices.push({
    text: "",
    explanation: "",
    isCorrect: false,
  });
};

const removeChoice = (index) => {
  form.value.choices.splice(index, 1);
};
</script>
