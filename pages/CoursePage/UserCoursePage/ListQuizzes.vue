<template>
  <div class="q-pa-xl column">
    <div class="bg-white q-pa-md items-start justify-start column">
      <div
        class="q-px-sm q-mb-lg row items-start justify-start"
        style="width: 100%"
      >
        <h5
          v-if="courseStore.course && courseStore.course.course_name"
          class="col-12 text-center q-mt-sm q-mb-xl"
        >
          You are about to take a quiz for the
          {{ courseStore.course.course_name }} course. Passing the quiz will
          qualify you to receive a certificate of completion. Take your time,
          and Good luck!
        </h5>
        <h5 class="col-12 q-my-none q-px-sm text-primary">LIST OF QUIZZES</h5>
      </div>
      <!-- <table-page
        :isViewOption="true"
        :isSearchTable="true"
        :showOptions="true"
        :rows="quizStore.quizzes"
        :columns="columns"
      /> -->
      <div class="q-pa-sm" style="width: 100%">
        <div>
          <div class="flex justify-end q-mb-md">
            <div class="flex justify-end items-center">
              <div class="q-mr-md">Search:</div>
              <q-input outlined dense class="bg-white" />
            </div>
          </div>
          <q-table
            flat
            bordered
            separator="cell"
            :rows="quizStore.quizzes"
            :columns="columns"
            row-key="name"
            table-header-class="bg-dark text-white"
            class="sticky-table-header"
            style="height: auto"
          >
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <div class="table-menu">
                  <q-btn
                    rounded
                    color="primary"
                    label="View"
                    @click="showUserDetailsDialog(props.row)"
                  />
                </div>
              </q-td>
            </template>
            <!--If table has no data-->

            <template v-slot:no-data>
              <div class="text-center q-pa-md" style="width: 100%">
                No Available Data
              </div>
            </template>
          </q-table>

          <!-- User Details Dialog -->
          <q-dialog v-model="showUserDetails">
            <q-card class="relative-position" style="min-width: 40vw">
              <div
                class="row justify-between"
                style="width: 100%; border-bottom: solid 1px #e6e6e6"
              >
                <q-card-section class="text-center">
                  <div class="text-h6 text-weight-regular">
                    User Information
                  </div>
                </q-card-section>
                <q-icon
                  name="cancel"
                  color="grey"
                  size="sm"
                  class="q-mt-md q-mr-md cursor-pointer"
                  @click="showUserDetails = false"
                />
              </div>

              <div class="q-gutter-sm q-pa-md">
                <div class="row">
                  <div class="col-6 q-px-sm">
                    <label>First Name <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      dense
                      class="q-mt-sm"
                      v-model="userDetails.first_name"
                      @change="onFieldChange('first_name', $event)"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-6 q-px-sm">
                    <label>Middle Name</label>
                    <q-input
                      outlined
                      dense
                      class="q-mt-sm"
                      v-model="userDetails.middle_name"
                      @change="onFieldChange('middle_name', $event)"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-10 q-px-sm">
                    <label>Last Name <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      dense
                      class="q-mt-sm"
                      v-model="userDetails.last_name"
                      @change="onFieldChange('last_name', $event)"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-2 q-px-sm">
                    <label>Suffix</label>
                    <q-input
                      outlined
                      dense
                      class="q-mt-sm"
                      v-model="userDetails.suffix"
                      @change="onFieldChange('suffix', $event)"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-6 q-px-sm">
                    <label>Phone <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      dense
                      class="q-mt-sm"
                      v-model="userDetails.phone"
                      @change="onFieldChange('phone', $event)"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="col-6 q-px-sm">
                    <label>Company <span class="text-red">*</span></label>
                    <q-input
                      outlined
                      dense
                      class="q-mt-sm"
                      v-model="userDetails.company"
                      @change="onFieldChange('company', $event)"
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                  </div>
                </div>
                <div class="q-px-sm">
                  <label>Email <span class="text-red">*</span></label>
                  <q-input
                    outlined
                    dense
                    class="q-mt-sm"
                    v-model="userDetails.email"
                    @change="onFieldChange('email', $event)"
                    :rules="[(val) => !!val || 'Field is required']"
                  />
                </div>
                <q-card-section class="flex justify-end q-my-sm q-py-none">
                  <q-btn
                    flat
                    no-caps
                    label="Close"
                    class="border-000000-all q-px-lg"
                    v-close-popup
                  />
                  <div class="q-mx-md"></div>
                  <q-btn
                    flat
                    no-caps
                    label="Confirm"
                    class="bg-accent text-white q-px-lg"
                    :disable="!isFormValid"
                    @click="confirmAndNavigate"
                  />
                </q-card-section>
              </div>
            </q-card>
          </q-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import {
  useQuizStore,
  useCourseStore,
  useLogStore,
} from "../../../stores/course-store";
import { onMounted, ref, computed } from "vue";
import { LocalStorage } from "quasar";

const userDetails = ref({
  first_name: "",
  last_name: "",
  middle_name: "",
  suffix: "",
  phone: "",
  company: "",
  email: "",
  status: "",
});

const router = useRouter();
const logStore = useLogStore();
const route = useRoute();
const quizStore = useQuizStore();
const courseStore = useCourseStore();
const showUserDetails = ref(false);
const selectedQuizId = ref(null);

const courseId = route.params.course_id;

const requiredFields = ["first_name", "last_name", "phone", "company", "email"];

onMounted(() => {
  quizStore.fetchQuizDataByCourse(courseId);
  courseStore.fetchCourseData(courseId);
});

const showUserDetailsDialog = (row) => {
  selectedQuizId.value = row.id;
  showUserDetails.value = true;
};

const isFormValid = computed(() => {
  return requiredFields.every((field) => !!userDetails.value[field]);
});

const onFieldChange = (field, value) => {
  userDetails.value[field] = value;
};

const confirmAndNavigate = () => {
  userDetails.value.quiz_id = selectedQuizId.value;
  logStore.logs = userDetails.value;
  LocalStorage.set("userDetails", userDetails.value);
  console.log("Logs ", logStore.logs);
  router.push({ name: "Quiz Page", params: { quiz_id: selectedQuizId.value } });
};

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
</script>
