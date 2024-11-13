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
      ]"
    />
    <div class="col-grow items-start justify-start column">
      <div
        class="q-px-sm q-mb-lg row items-end justify-end"
        style="width: 100%"
      >
        <q-btn
          @click="handleAddCourse"
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
        :viewName="'View Course Details'"
        :editName="'Edit Course'"
      />
    </div>
  </q-page>
</template>

<script setup>
import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import TablePage from "../../components/TablePage.vue";
import { useRouter } from "vue-router";

const columns = [
  {
    name: "name",
    required: true,
    label: "Course ID",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "Course Name",
    align: "center",
    label: "Course Name",
    field: "course_name",
  },
  { name: "Date Added", label: "Date Added", field: "date_added" },
  { name: "action", field: "action" },
];

const rows = [
  {
    id: 1,
    name: "1111",
    course_name: "Course 1",
    date_added: "2020-10-4",
  },
  {
    id: 2,
    name: "1112",
    course_name: "Course 2",
    date_added: "2020-10-4",
  },
  {
    id: 3,
    name: "1113",
    course_name: "Course 3",
    date_added: "2020-10-4",
  },
  {
    id: 4,
    name: "1114",
    course_name: "Course 4",
    date_added: "2020-10-4",
  },
  {
    id: 5,
    name: "1115",
    course_name: "Course 5",
    date_added: "2020-10-4",
  },
];

const router = useRouter();

const handleAddCourse = () => {
  router.push({ name: "Add Course" });
};
</script>
