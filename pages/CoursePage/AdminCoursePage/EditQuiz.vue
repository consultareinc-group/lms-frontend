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
      ]"
    />
    <div class="col-grow items-start justify-start column">
      <div
        class="bg-white q-my-lg q-py-lg q-px-xl items-start justify-start column"
        style="width: 100%"
      >
        <header class="q-mb-lg">
          <h6 class="q-ma-none">Quiz Details</h6>
          <p class="text-weight-thin">
            Please fill out the required fields
            <span class="text-red">*</span>
          </p>
        </header>
        <!---->
        <div class="row" style="width: 100%">
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
              />
            </div>
            <!---->
            <div>
              <label>Total Marks <span class="text-red">*</span></label>
              <q-input
                outlined
                v-model="form.total_marks"
                dense
                class="q-mt-sm"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
          </div>
          <!---->
          <div class="col-6 q-px-sm">
            <label>Passing Percentage <span class="text-red">*</span></label>
            <q-input
              outlined
              v-model="form.passing_percentage"
              dense
              class="q-mt-sm"
              :rules="[(val) => !!val || 'Field is required']"
            />
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
          :isBasicTable="false"
          :showOptions="true"
          :rows="rows"
          :columns="columns"
          :viewName="'View Question'"
          :editName="'Edit Question'"
          :isDialog="true"
        />
        <!-- Button -->
        <!-- <q-btn
          :to="{ name: 'Add Question', query: { origin: 'EditQuiz' } }"
          label="Add Question"
          no-caps
          flat
          class="bg-primary text-white q-mt-lg"
        /> -->
        <q-btn
          @click="showAddQuestionDialog"
          label="Add Question"
          no-caps
          flat
          class="bg-primary text-white q-mt-lg"
        />
      </div>

      <!-- Button -->
      <q-btn
        @click="handleSave"
        label="Save"
        no-caps
        flat
        class="bg-accent text-white q-px-xl q-mt-lg"
      />
    </div>
    <add-dialog v-model="addQuestionDialog" />
  </q-page>
</template>

<script setup>
import AddDialog from "./Components/AddDialog.vue";
import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import TablePage from "../../../components/TablePage.vue";
import { useNotification } from "./Composables/UseNotification";
import { ref } from "vue";

const { showNotif } = useNotification();

const addQuestionDialog = ref(false);

const showAddQuestionDialog = () => {
  addQuestionDialog.value = true;
};

function handleSave() {
  showNotif(
    "<p class='q-mb-none text-green'><span class='text-weight-bold'>Success</span>. The record has been updated.</p>",
    "green-2"
  );
}

let form = ref({
  quiz_name: "Quiz 1",
  total_marks: "3",
  passing_percentage: "100%",
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
];
</script>
