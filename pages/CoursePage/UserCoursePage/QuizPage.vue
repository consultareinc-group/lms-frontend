<template>
  <div class="col-grow items-center justify-center column q-px-xl">
    <div
      class="bg-white q-my-lg q-gutter-md items-start justify-start column"
      style="width: 60vw"
    >
      <header class="q-ma-none q-px-xl q-pt-lg" style="width: 100%">
        <h5 class="q-ma-none">Quiz Name</h5>
      </header>
      <q-separator dark />
      <div
        v-for="(question, index) in questionStore.questions"
        :key="index"
        class="q-my-lg q-px-xl q-mx-none"
      >
        <p>{{ index + 1 }}. {{ question.question_text }}</p>
        <q-option-group
          class="q-mb-md"
          :options="question.choices"
          option-label="choice_text"
          option-value="id"
        />
      </div>
      <div
        class="row justify-end q-mb-xl q-px-xl q-mx-none"
        style="width: 100%"
      >
        <q-btn
          label="Submit"
          no-caps
          flat
          class="bg-accent text-white q-px-xl q-mt-lg"
          @click="showArchiveDialog"
        />
      </div>
      <q-dialog v-model="alert">
        <q-card class="q-px-xl relative-position">
          <q-icon
            name="cancel"
            color="grey"
            size="sm"
            class="absolute-top-right q-mt-sm q-mr-sm cursor-pointer"
            @click="alert = false"
          />
          <q-card-section class="text-center q-mt-lg">
            <q-icon name="celebration" color="orange-10" size="lg" />
            <div class="text-h5 text-weight-bold">Congratulations</div>
          </q-card-section>
          <q-card-section class="q-pt-none text-center">
            You have achieved a 100% score! You are now eligible to receive your
            certification.
          </q-card-section>
          <q-card-section class="flex justify-center q-my-lg">
            <q-btn
              flat
              no-caps
              :to="{ name: 'Certification Page' }"
              label="Proceed"
              class="bg-accent text-white q-px-lg"
            />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useQuestionStore } from "src/resources/lms/stores/course-store";
import { useRoute } from "vue-router";

const route = useRoute();
const questionStore = useQuestionStore();
const quizId = ref(route.params.quizId);
let alert = ref(false);

questionStore.fetchQuestionAndChoices(quizId.value);

const showArchiveDialog = () => {
  alert.value = true;
};
</script>
