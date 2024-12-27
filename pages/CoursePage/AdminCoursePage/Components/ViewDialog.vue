<template>
  <q-dialog v-model="model">
    <q-card class="relative-position" style="min-width: 40vw">
      <div class="col-grow items-start justify-start column">
        <div
          class="bg-white q-py-lg items-start justify-start column"
          style="width: 100%"
        >
          <header
            class="q-pl-xl q-mb-lg row justify-between"
            style="width: 100%"
          >
            <div>
              <h6 class="q-ma-none">Question Details</h6>
            </div>
            <q-icon
              name="cancel"
              color="grey"
              size="sm"
              class="q-mr-md cursor-pointer"
              @click="model = false"
            />
          </header>
          <!---->
          <div class="q-px-xl row" style="width: 100%">
            <!---->
            <div class="col-12 q-px-sm q-mb-md">
              <h6 class="q-ma-none">Question</h6>
              <p>{{ editForm.question }}</p>
            </div>
            <!---->
            <div
              v-for="(choice, index) in form.choices"
              :key="index"
              class="row q-pa-sm"
              style="width: 100%"
            >
              <div class="col-6 q-pr-md">
                <label>Choice {{ index + 1 }}</label>
                <p></p>
                <!---->
                <div>
                  <q-checkbox v-model="choice.isCorrect" label="Is Correct" />
                </div>
              </div>
              <!---->
              <div class="col-6 q-pr-md">
                <label>Explanation</label>
                <p></p>
              </div>
              <!---->
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});

let form = ref({
  question: "",
  choices: [
    { text: "", explanation: "", isCorrect: false },
    { text: "", explanation: "", isCorrect: false },
    { text: "", explanation: "", isCorrect: false },
  ],
});

let editForm = ref({
  question: "Question 1",
  choices: [
    { text: "Choices 1", explanation: "Explanation 1", isCorrect: false },
    { text: "Choices 2", explanation: "Explanation 2", isCorrect: false },
    { text: "Choices 3", explanation: "Explanation 3", isCorrect: false },
  ],
});
</script>
