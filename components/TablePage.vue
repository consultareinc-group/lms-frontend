<template>
  <div class="q-pa-sm" style="width: 100%">
    <div>
      <div class="flex justify-end q-mb-md" v-if="isSearchTable">
        <div class="flex justify-end items-center">
          <div class="q-mr-md">Search:</div>
          <q-input outlined dense class="bg-white" />
        </div>
      </div>
      <q-table
        flat
        bordered
        :separator="isViewOption ? 'cell' : ''"
        :rows="props.rows"
        :columns="props.columns"
        row-key="name"
        table-header-class="bg-dark text-white"
        class="sticky-table-header"
        style="height: auto"
      >
        <template v-slot:body-cell-action="props" v-if="showOptions">
          <q-td :props="props">
            <div class="table-menu">
              <q-btn
                rounded
                color="primary"
                label="View"
                v-if="isViewOption"
                @click="showUserDetailsDialog(props.row)"
              />
              <q-btn dense icon="more_vert" flat round v-else>
                <q-menu>
                  <q-list>
                    <!-- <q-item
                              :to="{ name: 'route-name-here', params: { id: props.row.id } }"
                            > -->
                    <q-item
                      clickable
                      v-close-popup
                      @click="showViewQuestionDialog"
                      v-if="isDialog"
                    >
                      <q-item-section>View</q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      v-close-popup
                      :to="{ name: viewName }"
                      v-else
                    >
                      <q-item-section>View</q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      v-close-popup
                      @click="showEditQuestionDialog"
                      v-if="isDialog"
                    >
                      <q-item-section>Edit</q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      v-close-popup
                      :to="{ name: editName }"
                      v-else
                    >
                      <q-item-section>Edit</q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      v-close-popup
                      @click="showArchiveDialog(props.row.id)"
                    >
                      <q-item-section>Archive</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
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
              <div class="text-h6 text-weight-regular">User Information</div>
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

      <!-- Archive Dialog -->
      <q-dialog v-model="showArchive">
        <q-card class="q-px-xl relative-position">
          <q-icon
            name="cancel"
            color="grey"
            size="sm"
            class="absolute-top-right q-mt-sm q-mr-sm cursor-pointer"
            @click="showArchive = false"
          />
          <q-card-section class="text-center q-mt-lg">
            <!-- <q-icon name="delete" color="red" size="lg" /> -->
            <q-icon name="archive" color="orange-10" size="lg" />
            <!-- <div class="text-h6 text-weight-bold">Delete Confirmation</div> -->
            <div class="text-h6 text-weight-bold">Archive Confirmation</div>
          </q-card-section>

          <q-card-section class="q-pt-none text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit?
          </q-card-section>

          <q-card-section class="q-pt-none text-center">
            <span class="text-bold">Code: </span> CD-100001
          </q-card-section>

          <q-card-section class="flex justify-center q-my-lg">
            <q-btn
              flat
              no-caps
              label="Cancel"
              class="border-000000-all q-px-lg"
              v-close-popup
            />
            <div class="q-mx-md"></div>
            <q-btn
              flat
              no-caps
              label="Confirm"
              class="bg-accent text-white q-px-lg"
              @click="confirmArchive"
            />
          </q-card-section>
        </q-card>
      </q-dialog>
      <ViewDialog v-model="viewQuestionDialog" />
      <AddDialog v-model="editQuestionDialog" :dialog-type="'edit'" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import AddDialog from "../pages/CoursePage/AdminCoursePage/Components/AddDialog.vue";
import ViewDialog from "../pages/CoursePage/AdminCoursePage/Components/ViewDialog.vue";
import { addLog } from "src/resources/lms/stores/course-store";
import { useRouter } from "vue-router";

const router = useRouter();
const logStore = addLog();

const userDetails = ref({
  id: null,
  quiz_id: null,
  first_name: "",
  last_name: "",
  middle_name: "",
  suffix: "",
  phone: "",
  company: "",
  email: "",
  status: "Pending",
});

const onFieldChange = (field, value) => {
  userDetails.value[field] = value;
};

const saveLog = () => {
  logStore.logUserInfo({ ...userDetails.value });
};

const confirmAndNavigate = () => {
  saveLog();
  router.push({ name: "Quiz Page", params: { quizId: selectedQuizId.value } });
};

const props = defineProps({
  isDialog: {
    type: Boolean,
    required: false,
  },
  showOptions: {
    type: Boolean,
    required: false,
  },
  isViewOption: {
    type: Boolean,
    required: false,
  },
  isSearchTable: {
    type: Boolean,
    required: false,
  },
  rows: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  viewName: {
    type: String,
    required: false,
  },
  editName: {
    type: String,
    required: false,
  },
});

const viewQuestionDialog = ref(false);
const editQuestionDialog = ref(false);
const showUserDetails = ref(false);
const showArchive = ref(false);
const selectedQuizId = ref(null);

const showViewQuestionDialog = () => {
  viewQuestionDialog.value = true;
};

const showEditQuestionDialog = () => {
  editQuestionDialog.value = true;
};

const showUserDetailsDialog = (row) => {
  selectedQuizId.value = row.id;
  userDetails.value = {
    id: logStore.logs.length + 1,
    quiz_id: row.id,
    first_name: row.firstName || "",
    last_name: row.lastName || "",
    middle_name: row.middleName || "",
    suffix: row.suffix || "",
    phone: row.phone || "",
    company: row.company || "",
    email: row.email || "",
    status: "Pending",
  };
  showUserDetails.value = true;
};

const requiredFields = ["first_name", "last_name", "phone", "company", "email"];

const isFormValid = computed(() => {
  return requiredFields.every((field) => !!userDetails.value[field]);
});

const showArchiveDialog = (id) => {
  showArchive.value = true;
  console.log("id ", id);
};

const confirmArchive = () => {
  showArchive.value = false;
};
</script>
