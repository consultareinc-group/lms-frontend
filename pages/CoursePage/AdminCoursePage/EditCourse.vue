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
          label: 'Edit Course',
          // icon: 'home',
          to: { name: 'Edit Course' },
        },
      ]"
    />
    <div class="col-grow items-start justify-start column">
      <div
        class="bg-white q-my-lg q-py-lg q-px-xl items-start justify-start column"
        style="width: 100%"
      >
        <header class="q-mb-lg">
          <h6 class="q-ma-none">Course details</h6>
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
                v-model="form.course_name"
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
                v-model="form.status"
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
              v-model="form.video_link"
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
              v-model="form.description"
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
          Updated.
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
import { useNotification } from "./Composables/UseNotification";
import { ref } from "vue";

const { showNotif } = useNotification();

function handleSave() {
  showNotif(
    "<p class='q-mb-none text-green'><span class='text-weight-bold'>Success</span>. The record has been updated.</p>",
    "green-2"
  );
}

let options = ref(["Draft", "Published"]);
let form = ref({
  course_name: "Course 1",
  status: "Draft",
  video_link: "https://youtube.com",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
});
</script>
