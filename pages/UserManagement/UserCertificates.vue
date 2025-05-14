<template>
  <q-page class="q-pa-md column">
    <page-breadcrumbs
      :title="
        [user.first_name, user.middle_name, user.last_name]
          .filter((name) => name != null && name.trim() !== '')
          .join(' ') + ' Certificates'
      "
      :items="[
        {
          label: 'Learning Management System',
          // icon: 'home',
          to: { name: 'User Management' },
        },
        {
          label: 'User Management',
          // icon: 'home',
          to: { name: 'User Management' },
        },
        {
          label: 'View Certificates',
          // icon: 'home',
        },
      ]"
    />

    <div>
      <div class="flex justify-end q-mb-md">
        <div class="flex justify-end items-center">
          <div class="q-mr-md">Search:</div>
          <q-input
            v-model="search_keyword"
            outlined
            dense
            class="bg-white"
            debounce="1000"
            @update:model-value="search()"
          />
        </div>
      </div>

      <q-table
        flat
        bordered
        :rows="userCertificates"
        :columns="columns"
        row-key="id"
        table-header-class="bg-dark text-white"
        class="sticky-table-header"
        :loading="tableLoadingState"
        :rows-per-page-options="[10, 20, 30, 50, 100]"
      >
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div class="table-menu">
              <q-btn dense icon="more_vert" flat round>
                <q-menu style="width: 150px">
                  <q-list>
                    <q-item
                      clickable
                      v-close-popup
                      :to="{
                        name: 'View Certificate',
                        params: { log_id: props.row.id },
                      }"
                    >
                      <q-item-section>View Certificate</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "../../stores/user-store";
import { useLogStore } from "../../stores/log-store";

import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";

// Variables
const userStore = useUserStore();
const logStore = useLogStore();
const route = useRoute();

const user = ref({});
const userCertificates = ref([]);
const search_keyword = ref("");

const loading = ref(false);
const tableLoadingState = ref(false);

const columns = ref([
  {
    name: "id",
    required: true,
    label: "Certificate ID",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: false,
  },
  {
    name: "quiz_name",
    required: true,
    label: "Quiz Name",
    align: "left",
    field: (row) => row.quiz_name,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: "action", field: "action" },
  // Add more columns as needed
]);

// Lifecycle Hooks
onMounted(() => {
  getUser();
  getUserCertificates();
});

// Functions
const getUser = () => {
  loading.value = true;

  userStore
    .GetUser({ id: +route.params.user_id })
    .then((response) => {
      user.value = response.data[0];
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
    })
    .finally(() => {
      loading.value = false;
    });
};

const getUserCertificates = () => {
  tableLoadingState.value = true;

  logStore
    .GetLogsByUserId({ user_id: +route.params.user_id })
    .then((response) => {
      userCertificates.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching user certificates:", error);
    })
    .finally(() => {
      tableLoadingState.value = false;
    });
};
</script>

<style lang="scss" scoped></style>
