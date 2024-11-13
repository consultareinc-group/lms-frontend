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
          label: 'View Course Details',
          // icon: 'home',
          to: { name: 'View Course Details' },
        },
        {
          label: 'Edit Quiz',
          // icon: 'home',
          to: { name: 'Edit Quiz' },
        },
        {
          label: 'View Question',
          // icon: 'home',
          to: { name: 'View Question' },
        },
      ]"
    />
    <div class="col-grow items-start justify-start column">
      <div
        class="bg-white q-my-lg q-py-lg q-px-xl items-start justify-start column"
        style="width: 100%"
      >
        <header class="q-mb-lg">
          <h6 class="q-ma-none">Question Details</h6>
        </header>
        <!---->
        <div class="row" style="width: 100%">
          <!---->
          <div class="col-12 q-px-sm q-mb-md">
            <label>Question</label>
            <q-input
              type="textarea"
              outlined
              v-model="form.question"
              dense
              class="q-mt-sm"
              :rules="[(val) => !!val || 'Field is required']"
            />
          </div>
          <!---->
          <div class="row q-pa-sm" style="width: 100%">
            <div class="col-6 q-pr-md">
              <label>Choice 1</label>
              <q-input
                type="textarea"
                outlined
                v-model="form.choice_one"
                dense
                class="q-mt-sm q-pb-none"
                :rules="[(val) => !!val || 'Field is required']"
              />
              <!---->
              <div>
                <q-checkbox v-model="right" label="Is Correct" />
              </div>
            </div>
            <!---->
            <div class="col-6">
              <label>Explanation</label>
              <q-input
                type="textarea"
                outlined
                v-model="form.explanation_one"
                dense
                class="q-mt-sm"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
          </div>
          <!---->
          <div class="row q-pa-sm" style="width: 100%">
            <div class="col-6 q-pr-md">
              <label>Choice 2</label>
              <q-input
                type="textarea"
                outlined
                v-model="form.choice_two"
                dense
                class="q-mt-sm q-pb-none"
                :rules="[(val) => !!val || 'Field is required']"
              />
              <!---->
              <div>
                <q-checkbox v-model="right" label="Is Correct" />
              </div>
            </div>
            <!---->
            <div class="col-6">
              <label>Explanation</label>
              <q-input
                type="textarea"
                outlined
                v-model="form.explanation_two"
                dense
                class="q-mt-sm"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
          </div>
          <!---->
          <div class="row q-pa-sm" style="width: 100%">
            <div class="col-6 q-pr-md">
              <label>Choice 3</label>
              <q-input
                type="textarea"
                outlined
                v-model="form.choice_three"
                dense
                class="q-mt-sm q-pb-none"
                :rules="[(val) => !!val || 'Field is required']"
              />
              <!---->
              <div>
                <q-checkbox v-model="right" label="Is Correct" />
              </div>
            </div>
            <!---->
            <div class="col-6">
              <label>Explanation</label>
              <q-input
                type="textarea"
                outlined
                v-model="form.explanation_three"
                dense
                class="q-mt-sm"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
          </div>
        </div>
      </div>

      <!--Success modal-->
      <div
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
      </div>

      <!-- Button -->
      <!-- <q-btn
        :to="{ name: 'Add Question' }"
        label="Add Question"
        no-caps
        flat
        class="bg-primary text-white q-mt-lg"
      />
      <q-btn
        @click="handleOpenSuccesModal"
        label="Save"
        no-caps
        flat
        class="bg-accent text-white q-px-xl q-mt-lg"
      /> -->
    </div>
  </q-page>
</template>

<script setup>
import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";

import { ref } from "vue";

let isSuccessModalOpen = ref(false);

const handleOpenSuccesModal = () => {
  isSuccessModalOpen.value = true;
};

const handleCloseSuccesModal = () => {
  isSuccessModalOpen.value = false;
};

let form = ref({
  question: "Question 1",
  choice_one: "Choice 1",
  choice_two: "Choice 2",
  choice_three: "Choice 3",
  explanation_one: "Explanation 1",
  explanation_two: "Explanation 2",
  explanation_three: "Explanation 3",
});
</script>
