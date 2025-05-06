<template>
  <q-page class="q-pa-md column">
    <page-breadcrumbs
      title="User Management"
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
      ]"
    />

    <div>
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
          :rows="users"
          :columns="columns"
          row-key="id"
          table-header-class="bg-dark text-white"
          class="sticky-table-header"
          :loading="tableLoadingState"
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
                          name: 'User Certificates',
                          params: { user_id: props.row.id },
                        }"
                      >
                        <q-item-section>View Certificates</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../../stores/user-store";

import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";

// Variables
const userStore = useUserStore();

const users = ref([]);
const search_keyword = ref("");
const tableLoadingState = ref(false);

const columns = ref([
  {
    name: "id",
    required: true,
    label: "User ID",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: false,
  },
  {
    name: "full_name",
    required: true,
    label: "Full Name",
    align: "left",
    field: (row) =>
      [row.first_name, row.middle_name, row.last_name]
        .filter((name) => name != null && name.trim() !== "")
        .join(" "),
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "suffix",
    required: true,
    label: "Suffix",
    align: "left",
    field: (row) => row.suffix_name || "none",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "email",
    required: true,
    label: "Email",
    align: "left",
    field: (row) => row.email,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: "action", field: "action" },
  // Add more columns as needed
]);

// Lifecycle Hooks
onMounted(() => {
  getUsers();
});

// Functions
const getUsers = () => {
  tableLoadingState.value = true;

  userStore
    .GetUsers({ offset: users.value.length })
    .then((response) => {
      users.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    })
    .finally(() => {
      tableLoadingState.value = false;
    });
};
</script>

<style lang="scss" scoped></style>
