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
            label="Go back"
            icon="arrow_back"
            flat
            class="bg-accent text-white q-px-xl text-capitalize"
            @click="router.back()"
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
              <div>
                <label>Category Name <span class="text-red">*</span></label>
                <q-input
                  outlined
                  v-model="category.name"
                  dense
                  class="q-mt-sm"
                  :rules="[
                    (val) => !!val || 'Field is required',
                    (val) =>
                      !isCategoryNameDuplicate(val) ||
                      'Category name already exists',
                  ]"
                  lazy-rules
                />

                <div>
                  <label>Thumbnail</label>
                  <q-file
                    outlined
                    v-model="category.thumbnail"
                    dense
                    class="q-mt-sm"
                    :rules="[(val) => !!val || 'Field is required']"
                  >
                    <template v-slot:append>
                      <q-icon name="upload" />
                    </template>
                  </q-file>
                </div>
              </div>
            </div>

            <div class="full-width">
              <label>Category Description</label>
              <q-input
                type="textarea"
                outlined
                v-model="category.description"
                class="q-mt-sm full-height"
              />
            </div>
          </div>

          <q-btn
            type="submit"
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
        <div class="flex q-mb-md">
          <div class="flex items-center">
            <div class="q-mr-md">Search Category:</div>
            <q-input
              v-model="search_keyword"
              outlined
              dense
              class="bg-white"
              debounce="1000"
              @update:model-value="searchCategory"
            />
          </div>
        </div>
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
                {{ props.row.category_description || "No description" }}
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-thumbnail="props">
            <q-td :props="props">
              <q-img
                v-if="props.row.thumbnail"
                :src="props.row.thumbnail"
                style="width: 100px; height: 100px"
              />
              <q-img
                v-else
                src="../../../assets/sample-category-image.png"
                style="width: 100px; height: 100px"
              />
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
                        @click="showEditCategoryDialog(props.row.id)"
                      >
                        <q-item-section>Edit</q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        @click="showDeleteCategoryDialog(props.row)"
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

    <!-- Edit Category Dialog -->
    <q-dialog v-model="editDialog" persistent>
      <q-card class="q-px-xl relative-position" style="width: 700px">
        <q-icon
          name="cancel"
          color="grey"
          size="sm"
          class="absolute-top-right q-mt-sm q-mr-sm cursor-pointer"
          @click="editDialog = false"
        />
        <q-card-section class="q-mt-lg">
          <q-form
            @submit.prevent="editCategory(editCategoryData.id)"
            class="full-width"
            ref="courseForm"
            greedy
          >
            <div class="column full-width no-wrap" style="gap: 20px">
              <div class="full-width">
                <label>Category Name <span class="text-red">*</span></label>
                <q-input
                  outlined
                  v-model="editCategoryData.name"
                  dense
                  class="q-mt-sm"
                  :rules="[(val) => !!val || 'Field is required']"
                  lazy-rules
                />
              </div>
              <div class="full-width">
                <label>Category Description</label>
                <q-input
                  type="textarea"
                  outlined
                  v-model="editCategoryData.description"
                  class="q-mt-sm"
                  autogrow
                />
              </div>
            </div>

            <div class="row full-width justify-center q-mt-lg">
              <q-btn
                flat
                no-caps
                label="Cancel"
                class="border-000000-all q-px-lg"
                @click="editDialog = false"
              />
              <div class="q-mx-md"></div>
              <q-btn
                type="submit"
                flat
                no-caps
                class="bg-accent text-white q-px-lg"
                :disable="editCategoryLoading"
              >
                <q-spinner v-if="editCategoryLoading" />
                <span v-else>Confirm</span>
              </q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Delete Category Dialog -->
    <q-dialog v-model="deleteDialog" persistent>
      <q-card class="q-px-xl relative-position">
        <q-icon
          name="cancel"
          color="grey"
          size="sm"
          class="absolute-top-right q-mt-sm q-mr-sm cursor-pointer"
          @click="deleteDialog = false"
        />
        <q-card-section class="text-center q-mt-lg">
          <q-icon name="delete" color="red-10" size="lg" />
          <div class="text-h6 text-weight-bold">Delete Confirmation</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          Are you sure you want to delete this Category?
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
            class="bg-accent text-white q-px-lg"
            @click="deleteCategory(selectedCategoryToBeDeleted.id)"
            :disable="deleteCategoryLoading"
          >
            <q-spinner v-if="deleteCategoryLoading" />
            <span v-else>Confirm</span>
          </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useCategoryStore } from "../../../stores/category-store";

import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import { useRouter } from "vue-router";

// Variables
const router = useRouter();
const categoryStore = useCategoryStore();
const $q = useQuasar();

const category = ref({
  name: "",
  description: "",
  thumbnail: null,
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
  {
    name: "thumbnail",
    required: true,
    label: "Thumbnail",
    align: "left",
    field: (row) => row.thumbnail,
    format: (val) => `${val}`,
    sortable: false,
  },
  { name: "action", field: "action" },
  // Add more columns as needed
]);

const categories = ref([]);
const tableLoading = ref(false);

const editCategoryData = ref({
  id: null,
  name: "",
  description: "",
});

const editDialog = ref(false);
const editCategoryLoading = ref(false);

const deleteDialog = ref(false);
const deleteCategoryLoading = ref(false);
const selectedCategoryToBeDeleted = ref(null);

const search_keyword = ref("");

// Computed property to check for duplicate category names
const isCategoryNameDuplicate = (name) =>
  categories.value.some(
    (cat) => cat.category_name.toLowerCase() === name.toLowerCase()
  );

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
      categories.value = [...categories.value, ...response.data];
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

const searchCategory = () => {
  tableLoading.value = true;
  categories.value = [];

  categoryStore
    .SearchCategories({ keyword: search_keyword.value })
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

const saveCategory = () => {
  btnLoadingState.value = true;

  const payload = {
    category_name: category.value.name,
    category_description: category.value.description || "",
  };

  categoryStore
    .AddCategory({ payload })
    .then((response) => {
      $q.notify({
        html: true,
        message: `<strong>Success!</strong> Category added successfully.`,
        position: "top-right",
        timeout: 2000,
        classes: "quasar-notification-success",
      });

      categories.value = [];
      getCategories();
    })
    .catch(() => {
      $q.notify({
        html: true,
        message: `<strong>Error!</strong> Unable to add category.`,
        position: "top-right",
        timeout: 2000,
        classes: "quasar-notification-negative",
      });
    })
    .finally(() => {
      btnLoadingState.value = false;
      category.value = {
        name: "",
        description: "",
      };
    });
};

const showEditCategoryDialog = (id) => {
  editDialog.value = true;

  categoryStore
    .GetCategory({ id })
    .then((response) => {
      editCategoryData.value.id = response.data.id;
      editCategoryData.value.name = response.data.category_name;
      editCategoryData.value.description = response.data.category_description;
    })
    .catch((error) => {
      $q.notify({
        type: "negative",
        message: "An error occurred. Please try again",
      });
      editDialog.value = false;
    });
};

const editCategory = (id) => {
  editCategoryLoading.value = true;

  const payload = {
    id: editCategoryData.value.id,
    category_name: editCategoryData.value.name,
    category_description: editCategoryData.value.description || "",
  };

  categoryStore
    .EditCategory({ id: editCategoryData.value.id, payload })
    .then((response) => {
      $q.notify({
        html: true,
        message: `<strong>Success!</strong> Category updated successfully.`,
        position: "top-right",
        timeout: 2000,
        classes: "quasar-notification-success",
      });

      categories.value = categories.value.map((cat) => {
        if (cat.id === id) {
          cat.category_name = editCategoryData.value.name;
          cat.category_description = editCategoryData.value.description;
        }
        return cat;
      });
      editDialog.value = false;
    })
    .catch(() => {
      $q.notify({
        html: true,
        message: `<strong>Error!</strong> Unable to update category.`,
        position: "top-right",
        timeout: 2000,
        classes: "quasar-notification-negative",
      });
    })
    .finally(() => {
      editCategoryLoading.value = false;
      editDialog.value = false;

      // Empty the editCategoryData
      editCategoryData.value = {
        id: null,
        name: "",
        description: "",
      };
    });
};

const showDeleteCategoryDialog = (category) => {
  selectedCategoryToBeDeleted.value = category;
  deleteDialog.value = true;
};

const deleteCategory = (id) => {
  deleteCategoryLoading.value = true;

  // convert id to number
  id = parseInt(id);

  categoryStore
    .DeleteCategory({ id })
    .then((response) => {
      $q.notify({
        html: true,
        message: `<strong>Success!</strong> Category deleted successfully.`,
        position: "top-right",
        timeout: 2000,
        classes: "quasar-notification-success",
      });
      categories.value = categories.value.filter((cat) => cat.id !== id);
      deleteDialog.value = false;
    })
    .catch(() => {
      $q.notify({
        html: true,
        message: `<strong>Error!</strong> Unable to delete category.`,
        position: "top-right",
        timeout: 2000,
        classes: "quasar-notification-error",
      });
    })
    .finally(() => {
      deleteCategoryLoading.value = false;
      deleteDialog.value = false;
    });
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

:deep(.q-textarea .q-field__native) {
  resize: none;
  padding-top: 10px;
}
</style>
