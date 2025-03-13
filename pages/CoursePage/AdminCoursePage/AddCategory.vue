<template>
  <q-page class="q-pa-md column">
    <page-breadcrumbs
      title="Course Management"
      :items="[
        {
          label: 'Learning Management System',
          // icon: 'home',
          to: { name: 'Course Management' },
        },
        {
          label: 'Course Management',
          // icon: 'home',
          to: { name: 'Course Management' },
        },
        {
          label: 'Add Category',
          // icon: 'home',
          to: { name: 'Add Category' },
        },
      ]"
    />
    <div class="col-grow items-start justify-start column">
      <div
        class="bg-white q-my-lg q-py-lg q-px-xl items-start justify-start column"
        style="width: 100%"
      >
        <header class="q-mb-lg row justify-between full-width items-center">
          <div>
            <h6 class="q-ma-none">Add Category</h6>
            <p class="text-weight-thin">
              Please fill out the required fields
              <span class="text-red">*</span>
            </p>
          </div>
          <q-btn
            label="Go back to Add Course"
            icon="arrow_back"
            flat
            :to="{ name: 'Add Course' }"
            class="bg-accent text-white q-px-xl text-capitalize"
          />
        </header>

        <q-form
          @submit.prevent="saveCategory"
          class="full-width"
          ref="courseForm"
          greedy
        >
          <div class="row full-width no-wrap" style="gap: 20px">
            <div class="full-width">
              <label>Category Name <span class="text-red">*</span></label>
              <q-input
                outlined
                v-model="category.name"
                dense
                class="q-mt-sm"
                :rules="[(val) => !!val || 'Field is required']"
                lazy-rules
              />
            </div>
            <div class="full-width">
              <label
                >Category Description <span class="text-red">*</span></label
              >
              <q-input
                type="textarea"
                outlined
                v-model="category.description"
                class="q-mt-sm"
                :rules="[(val) => !!val || 'Field is required']"
                autogrow
              />
            </div>
          </div>

          <q-btn
            :loading="btnLoadingState"
            label="Save"
            no-caps
            flat
            class="bg-accent text-white q-px-xl q-mt-lg"
          />
        </q-form>
      </div>

      <div>
        <h6 class="q-ma-none q-mb-md q-mt-xl">List of Available Categories</h6>
        <q-table
          flat
          :rows="categories"
          :columns="columns"
          row-key="id"
          table-header-class="bg-dark text-white"
          class="overflow-auto"
          :loading="tableLoading"
          style="max-width: 700px"
          :rows-per-page-options="[10, 20, 30]"
        >
          <template v-slot:body-cell-category_description="props">
            <q-td :props="props">
              <div style="white-space: normal">
                {{ props.row.category_description }}
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <div class="table-menu">
                <q-btn dense icon="more_vert" flat round>
                  <q-menu style="width: 100px">
                    <q-list>
                      <q-item
                        clickable
                        v-close-popup
                        @click="editProductionPlan(props.row.id)"
                      >
                        <q-item-section>Edit</q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        @click="showArchiveDialog(props.row)"
                      >
                        <q-item-section>Delete</q-item-section>
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
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useCategoryStore } from "../../../stores/category-store";

import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";

// Variables
const router = useRouter();
const categoryStore = useCategoryStore();
const $q = useQuasar();

const category = ref({
  name: "",
  description: "",
});

const btnLoadingState = ref(false);

const columns = ref([
  {
    name: "category_name",
    required: true,
    label: "Category Name",
    align: "left",
    field: (row) => row.category_name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "category_description",
    required: true,
    label: "Category Description",
    align: "left",
    field: (row) => row.category_description,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: "action", field: "action" },
  // Add more columns as needed
]);

const categories = ref([]);
const tableLoading = ref(false);

// Lifecycle Hooks
onMounted(() => {
  getCategories();
});

// Functions
const getCategories = () => {
  tableLoading.value = true;

  categoryStore
    .GetCategories({ offset: categories.value.length })
    .then((response) => {
      categories.value = response.data;
    })
    .catch((error) => {
      $q.notify({
        type: "negative",
        message: "An error occurred. Please try again",
      });
    })
    .finally(() => {
      tableLoading.value = false;
    });
};

const saveCategory = async () => {
  btnLoadingState.value = true;

  try {
    console.log(category.value);
    $q.notify({
      type: "positive",
      message: "Category added successfully",
    });
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "An error occurred. Please try again",
    });
  } finally {
    btnLoadingState.value = false;
  }
};
</script>

<style scoped>
:deep(.q-textarea .q-field__control) {
  min-height: 150px;
}

:deep(.q-table__linear-progress) {
  color: #fff !important;
  height: 5px;
}
</style>
