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
              <q-btn dense icon="more_vert" flat round>
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
import { ref } from "vue";
import AddDialog from "../pages/CoursePage/AdminCoursePage/Components/AddDialog.vue";
import ViewDialog from "../pages/CoursePage/AdminCoursePage/Components/ViewDialog.vue";

const props = defineProps({
  isDialog: {
    type: Boolean,
    required: false,
  },
  showOptions: {
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
const showArchive = ref(false);

const showViewQuestionDialog = () => {
  viewQuestionDialog.value = true;
};

const showEditQuestionDialog = () => {
  editQuestionDialog.value = true;
};

const showArchiveDialog = (id) => {
  showArchive.value = true;
  console.log("id ", id);
};

const confirmArchive = () => {
  showArchive.value = false;
};
</script>
