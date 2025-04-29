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
          :rows="courses"
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
                  <q-menu style="width: 100px">
                    <q-list>
                      <q-item
                        clickable
                        v-close-popup
                        :to="{
                          name: 'View Course Details',
                          params: { course_id: props.row.id },
                        }"
                      >
                        <q-item-section>View</q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        :to="{
                          name: 'Edit Course',
                          params: { course_id: props.row.id },
                        }"
                      >
                        <q-item-section>Edit</q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        @click="showArchiveDialog(props.row)"
                      >
                        <q-item-section>Archive</q-item-section>
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
import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";

// Variables
const search_keyword = ref("");
const tableLoadingState = ref(false);
const courses = ref([]);
const columns = ref([
  {
    name: "id",
    label: "ID",
    align: "left",
    field: "id",
    sortable: true,
  },
  {
    name: "name",
    label: "Name",
    align: "left",
    field: "name",
    sortable: true,
  },
  {
    name: "email",
    label: "Email",
    align: "left",
    field: "email",
    sortable: true,
  },
  {
    name: "action",
    label: "",
    align: "right",
    field: "",
  },
]);
</script>

<style lang="scss" scoped></style>
