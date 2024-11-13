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
          label: 'View Quiz',
          // icon: 'home',
          to: { name: 'View Quiz' },
        },
      ]"
    />
    <div class="col-grow items-start justify-start column">
      <div
        class="bg-white q-my-lg q-py-lg q-px-xl items-start justify-start column"
        style="width: 100%"
      >
        <header class="q-mb-md">
          <h6 class="q-ma-none">Quiz Details</h6>
        </header>
        <!---->
        <div class="row" style="width: 100%">
          <!---->
          <div class="col-4 q-px-sm">
            <div class="q-my-md">
              <p class="q-mb-sm">Quiz ID:</p>
              <p class="q-mb-sm text-weight-light">1111</p>
            </div>
            <!---->
            <div class="q-my-md">
              <p class="q-mb-sm">Date Added:</p>
              <p class="q-mb-sm text-weight-light">2024-10-4</p>
            </div>
            <!---->
            <div class="q-my-md">
              <p class="q-mb-sm">No of Questions:</p>
              <p class="q-mb-sm text-weight-light">3</p>
            </div>
          </div>
          <!---->
          <div class="col-4 q-px-sm">
            <div class="q-my-md">
              <p class="q-mb-sm">Quiz Name:</p>
              <p class="q-mb-sm text-weight-light">Quiz 1</p>
            </div>
            <!---->
            <div class="q-my-md">
              <p class="q-mb-sm">Last Updated:</p>
              <p class="q-mb-sm text-weight-light">2024-10-4</p>
            </div>
          </div>
          <!---->
          <div class="col-4 q-px-sm">
            <div class="q-my-md">
              <p class="q-mb-sm">Passing Percentage:</p>
              <p class="q-mb-sm text-weight-light">100%</p>
            </div>
            <!---->
            <div class="q-my-md">
              <p class="q-mb-sm">Total Marks</p>
              <p class="q-mb-sm text-weight-light">3</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quizzes -->
      <div
        class="bg-white q-my-lg q-py-md q-px-lg items-start justify-start column"
        style="width: 100%"
      >
        <h6 class="q-ma-none text-primary text-weight-bold q-px-sm">
          Questions
        </h6>
        <table-page
          :isViewOption="false"
          :isSearchTable="false"
          :showOptions="false"
          :rows="rows"
          :columns="columns"
        />
      </div>

      <!--Success modal-->
      <div
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
      </div>

      <!-- Button -->
      <!-- <q-btn
        :to="{ name: 'Add Question' }"
        label="Add Question"
        no-caps
        flat
        class="bg-primary text-white q-mt-lg"
      />
      <q-btn
        @click="handleOpenSuccesModal"
        label="Save"
        no-caps
        flat
        class="bg-accent text-white q-px-xl q-mt-lg"
      /> -->
    </div>
  </q-page>
</template>

<script setup>
import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import TablePage from "../../components/TablePage.vue";

import { ref } from "vue";

let isSuccessModalOpen = ref(false);

const handleOpenSuccesModal = () => {
  isSuccessModalOpen.value = true;
};

const handleCloseSuccesModal = () => {
  isSuccessModalOpen.value = false;
};

let form = ref({
  input_text: null,
  input_date: null,
  input_file: null,
});

const columns = [
  {
    name: "name",
    required: true,
    label: "No.",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "Question",
    align: "center",
    label: "Question",
    field: "question",
  },
  { name: "Marks", label: "Marks", field: "marks" },
  { name: "action", field: "action" },
];

const rows = [
  {
    id: 1,
    name: "1",
    question: "Question 1",
    marks: "1",
  },
  {
    id: 2,
    name: "2",
    question: "Question 2",
    marks: "1",
  },
  {
    id: 3,
    name: "3",
    question: "Question 3",
    marks: "1",
  },
];
</script>
