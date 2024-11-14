<template>
  <div class="q-pa-xl column">
    <div class="bg-white q-pa-md items-start justify-start column">
      <div
        class="q-px-sm q-mb-lg row items-start justify-start"
        style="width: 100%"
      >
        <h5 class="q-my-none q-px-sm text-primary">LIST OF QUIZZES</h5>
      </div>
      <table-page
        :isViewOption="true"
        :isSearchTable="true"
        :showOptions="true"
        :rows="rows"
        :columns="columns"
      />
    </div>
  </div>
</template>

<script setup>
import TablePage from "../../../components/TablePage.vue";

const columns = [
  {
    name: "Quiz Name",
    label: "Quiz Name",
    field: "quiz_name",
    required: true,
    align: "left",
    sortable: true,
  },
  { name: "action", label: "Action", field: "action", align: "center" },
];

const rows = [
  {
    quiz_name: "Quiz 1",
  },
  {
    quiz_name: "Quiz 2",
  },
  {
    quiz_name: "Quiz 3",
  },
  {
    quiz_name: "Quiz 4",
  },
  {
    quiz_name: "Quiz 5",
  },
];
</script>
