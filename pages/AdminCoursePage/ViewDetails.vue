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
      ]"
    />
    <div class="col-grow items-start justify-start column">
      <div
        class="bg-white q-my-lg q-py-lg q-px-xl items-start justify-start column"
        style="width: 100%"
      >
        <header>
          <h6 class="q-mb-lg q-mt-none">Course Details</h6>
        </header>
        <div class="q-px-sm">
          <p class="q-mb-sm">Status:</p>
          <p class="q-mb-sm text-weight-light">Draft</p>
        </div>
        <div class="row" style="width: 100%">
          <!---->
          <div class="col-4 q-px-sm">
            <div class="q-my-md">
              <p class="q-mb-sm">Course ID:</p>
              <p class="q-mb-sm text-weight-light">1111</p>
            </div>
            <!---->
            <div class="q-my-md">
              <p class="q-mb-sm">Date Added:</p>
              <p class="q-mb-sm text-weight-light">2024-10-4</p>
            </div>
            <!---->
            <div class="q-my-md">
              <p class="q-mb-sm">No of Quizzes:</p>
              <p class="q-mb-sm text-weight-light">3</p>
            </div>
          </div>
          <!---->
          <div class="col-4 q-px-sm">
            <div class="q-my-md">
              <p class="q-mb-sm">Course Name:</p>
              <p class="q-mb-sm text-weight-light">Course 1</p>
            </div>
            <!---->
            <div class="q-my-md">
              <p class="q-mb-sm">Last Updated:</p>
              <p class="q-mb-sm text-weight-light">2024-10-4</p>
            </div>
            <!---->
            <div class="q-my-md">
              <p class="q-mb-sm">Video Embed Link:</p>
              <p class="q-mb-sm text-weight-light">https://youtube.com</p>
            </div>
          </div>
          <!---->
          <div class="col-4 q-px-sm q-my-md">
            <p class="q-mb-sm">Description:</p>
            <p class="q-mb-sm text-weight-light">
              Lorem ipsum odor amet, consectetuer adipiscing elit. Suscipit
              blandit placerat quam, finibus cursus sagittis vestibulum.
              Inceptos odio mattis iaculis leo id.@gmail.com
            </p>
          </div>
        </div>
      </div>
      <div
        class="col-grow items-start justify-start column"
        style="width: 100%"
      >
        <h5 class="q-mb-none q-px-sm text-primary">LIST OF QUIZZES</h5>
        <div
          class="q-px-sm q-mb-lg row items-end justify-end"
          style="width: 100%"
        >
          <q-btn
            :to="{ name: 'Add Quiz' }"
            label="Add New"
            no-caps
            flat
            class="bg-primary text-white"
          />
        </div>
        <table-page
          :isViewOption="false"
          :isSearchTable="true"
          :showOptions="true"
          :rows="rows"
          :columns="columns"
          :viewName="'View Quiz'"
          :editName="'Edit Quiz'"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import TablePage from "../../components/TablePage.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const columns = [
  {
    name: "name",
    required: true,
    label: "Quiz ID",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "Quiz Name",
    align: "center",
    label: "Quiz Name",
    field: "quiz_name",
  },
  { name: "Date Added", label: "Date Added", field: "date_added" },
  { name: "action", field: "action" },
];

const rows = [
  {
    id: 1,
    name: "1111",
    quiz_name: "Quiz 1",
    date_added: "2020-10-4",
  },
  {
    id: 2,
    name: "1112",
    quiz_name: "Quiz 2",
    date_added: "2020-10-4",
  },
  {
    id: 3,
    name: "1113",
    quiz_name: "Quiz 3",
    date_added: "2020-10-4",
  },
  {
    id: 4,
    name: "1114",
    quiz_name: "Quiz 4",
    date_added: "2020-10-4",
  },
  {
    id: 5,
    name: "1115",
    quiz_name: "Quiz 5",
    date_added: "2020-10-4",
  },
];
</script>
