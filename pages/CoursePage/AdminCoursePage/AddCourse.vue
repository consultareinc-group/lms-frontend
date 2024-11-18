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
          label: 'Add Course',
          // icon: 'home',
          to: { name: 'Add Course' },
        },
      ]"
    />
    <div class="col-grow items-start justify-start column">
      <div
        class="bg-white q-my-lg q-py-lg q-px-xl items-start justify-start column"
        style="width: 100%"
      >
        <header class="q-mb-lg">
          <h6 class="q-ma-none">Add Course</h6>
          <p class="text-weight-thin">
            Please fill out the required fields
            <span class="text-red">*</span>
          </p>
        </header>
        <!---->
        <div class="row" style="width: 100%">
          <!---->
          <div class="col-4 q-px-sm">
            <div>
              <label>Course Name <span class="text-red">*</span></label>
              <q-input
                outlined
                v-model="form.input_text"
                dense
                class="q-mt-sm"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
            <!---->
            <div>
              <label>Status <span class="text-red">*</span></label>
              <q-select
                outlined
                dense
                v-model="form.select"
                :options="options"
                class="q-mt-sm"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
          </div>
          <!---->
          <div class="col-4 q-px-sm">
            <label>Video Embed Link <span class="text-red">*</span></label>
            <q-input
              outlined
              v-model="form.input_text"
              dense
              class="q-mt-sm"
              :rules="[(val) => !!val || 'Field is required']"
            />
          </div>
          <!---->
          <div class="col-4 q-px-sm">
            <label>Description <span class="text-red">*</span></label>
            <q-input
              type="textarea"
              outlined
              v-model="form.input_text"
              dense
              class="q-mt-sm"
              :rules="[(val) => !!val || 'Field is required']"
            />
          </div>
        </div>
      </div>
      <!--Success modal-->
      <!-- <div
        style="width: 100%; border: solid 1px green"
        class="items-center justify-between row bg-green-2 q-pa-md rounded-borders"
        v-if="isSuccessModalOpen"
      >
        <p class="q-mb-none text-green">
          <span class="text-weight-bold">Success!</span> The record has been
          saved.
        </p>
        <q-icon
          class="text-green"
          name="close"
          @click="handleCloseSuccesModal"
          style="cursor: pointer"
        />
      </div> -->
      <q-btn
        @click="handleSave"
        label="Save"
        no-caps
        flat
        class="bg-accent text-white q-px-xl q-mt-lg"
      />
    </div>
  </q-page>
</template>

<script setup>
import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import { useNotification } from "../Composables/UseNotification";
import { ref } from "vue";

const { showNotif } = useNotification();

function handleSave() {
  showNotif(
    "<p class='q-mb-none text-green'><span class='text-weight-bold'>Success</span>. The record has been added.</p>",
    "green-2"
  );
}

let options = ref(["Draft", "Published"]);
let form = ref({
  input_text: null,
  input_date: null,
  input_file: null,
});
</script>

<!-- <style>
.bordered-notification {
  border: 1px solid green;
  border-radius: 4px;
}
</style> -->
