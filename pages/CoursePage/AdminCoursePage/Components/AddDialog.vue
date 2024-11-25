<template>
  <q-dialog :v-model="isDialogOpen">
    <q-card class="q-px-xl relative-position" style="min-width: 70vw">
      <div class="col-grow items-start justify-start column">
        <div
          class="bg-white q-py-lg items-start justify-start column"
          style="width: 100%"
        >
          <header class="q-mb-lg row justify-between" style="width: 100%">
            <div>
              <h6 class="q-ma-none">Question Details</h6>
              <p class="text-weight-thin">
                Please fill out the required fields
                <span class="text-red">*</span>
              </p>
            </div>
            <q-icon
              name="cancel"
              color="grey"
              size="sm"
              class="q-mt-md q-mr-md cursor-pointer"
              @click="isDialogOpen = false"
            />
          </header>
          <!---->
          <div class="row" style="width: 100%">
            <!---->
            <div class="col-12 q-px-sm q-mb-md">
              <label>Question <span class="text-red">*</span></label>
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
            <div
              v-for="(choice, index) in form.choices"
              :key="index"
              class="row q-pa-sm"
              style="width: 100%"
            >
              <div class="col-5 q-pr-md">
                <label
                  >Choice {{ index + 1 }} <span class="text-red">*</span></label
                >
                <q-input
                  type="textarea"
                  outlined
                  v-model="choice.text"
                  dense
                  class="q-mt-sm q-pb-none"
                  :rules="[(val) => !!val || 'Field is required']"
                />
                <!---->
                <div>
                  <q-checkbox v-model="choice.isCorrect" label="Is Correct" />
                </div>
              </div>
              <!---->
              <div class="col-6 q-pr-md">
                <label>Explanation</label>
                <q-input
                  type="textarea"
                  outlined
                  v-model="choice.explanation"
                  dense
                  class="q-mt-sm"
                  :rules="[(val) => !!val || 'Field is required']"
                />
              </div>
              <!---->
              <div class="col-1 flex items-center justify-center">
                <q-icon
                  size="2.5rem"
                  name="delete"
                  color="red-8"
                  class="q-mx-sm"
                  @click="removeChoice(index)"
                  style="cursor: pointer"
                />
              </div>
            </div>
          </div>
          <!-- Button -->
          <q-btn
            label="Add Choice"
            no-caps
            flat
            class="bg-primary text-white q-mt-lg"
            @click="addChoice"
          />

          <!-- Button -->
          <q-btn
            label="Save"
            no-caps
            flat
            class="bg-accent text-white q-px-xl q-mt-lg"
          />
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
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  model: {
    type: Boolean,
    required: true,
  },
});

const isDialogOpen = ref(props.model);

let form = ref({
  question: "",
  choices: [
    { text: "", explanation: "", isCorrect: false },
    { text: "", explanation: "", isCorrect: false },
    { text: "", explanation: "", isCorrect: false },
  ],
});

const addChoice = () => {
  form.value.choices.push({
    text: "",
    explanation: "",
    isCorrect: false,
  });
};

const removeChoice = (index) => {
  form.value.choices.splice(index, 1);
};
</script>
