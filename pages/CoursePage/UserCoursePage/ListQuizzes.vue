<template>
  <div class="q-pa-xl column">
    <div class="bg-white q-pa-md items-start justify-start column">
      <div
        class="q-px-sm q-mb-lg row items-start justify-start"
        style="width: 100%"
      >
        <q-skeleton
          v-if="!courseStore.course.course_name"
          square
          height="150px"
          width="100%"
          class="q-mb-md"
        />
        <div v-else class="col-12 q-mt-sm q-mb-xl">
          <h5 class="q-ma-none text-grey-9">
            <b>Course: {{ courseStore.course.course_name }}</b>
          </h5>
          <h6 class="q-ma-none">
            Passing the quiz earns you a Certificate of Completion. Take your
            time and give it your best shot—good luck!
          </h6>
        </div>
      </div>
      <div class="q-pa-sm" style="width: 100%">
        <div>
          <div class="flex justify-between items-center q-mb-md">
            <h6 class="col-12 q-my-none q-px-sm text-primary">
              LIST OF QUIZZES
            </h6>
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
            :loading="tblLoadingState"
          >
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <div class="table-menu">
                  <q-btn
                    dense
                    rounded
                    color="primary"
                    label="View"
                    class="q-px-lg"
                    no-caps
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
  date_time_completed: "",
});

const router = useRouter();
const logStore = useLogStore();
const route = useRoute();
const quizStore = useQuizStore();
const courseStore = useCourseStore();
const showUserDetails = ref(false);
const selectedQuizId = ref(null);
const localUserDetails = ref(LocalStorage.getItem("userDetails"));

const courseId = route.params.course_id;

const requiredFields = ["first_name", "last_name", "phone", "company", "email"];

const tblLoadingState = ref(true);
onMounted(() => {
  courseStore.fetchCourseData(courseId);
  let response = quizStore.fetchQuizDataByCourse(courseId);
  response.then((data) => {
    tblLoadingState.value = false;
  });
});

const showUserDetailsDialog = (row) => {
  selectedQuizId.value = row.id;

  if (localUserDetails.value && localUserDetails.value.first_name) {
    showUserDetails.value = false;
    router.push({
      name: "Quiz Page",
      params: { quiz_id: selectedQuizId.value },
    });
  } else {
    showUserDetails.value = true;
    console.log("userDetails.value.first_name is empty or null");
  }
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
