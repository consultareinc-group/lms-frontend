<template>
  <div class="col-grow items-center justify-center column q-px-xl">
    <div
      class="bg-white q-my-lg q-gutter-md items-start justify-start column"
      style="width: auto"
    >
      <header class="q-ma-none q-px-xl q-pt-lg" style="width: 100%">
        <h5 class="q-ma-none">Quiz Name</h5>
      </header>
      <q-separator dark />
      <div
        v-for="(quiz, index) in quizData"
        :key="index"
        class="q-my-lg q-px-xl q-mx-none"
      >
        <p>{{ index + 1 }}. {{ quiz.question }}</p>
        <q-option-group
          class="q-mb-md"
          :options="quiz.choices"
          option-label="text"
          option-value="text"
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
      <!-- Submission Dialog -->
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

      <!-- <q-dialog v-model="alert">
        <q-card class="q-px-xl relative-position">
          <q-icon
            name="cancel"
            color="grey"
            size="sm"
            class="absolute-top-right q-mt-sm q-mr-sm cursor-pointer"
            @click="alert = false"
          />
          <q-card-section class="text-center q-mt-lg">
            <q-icon name="dangerous" color="orange-10" size="lg" />
            <div class="text-h5 text-weight-bold">Almost there!</div>
          </q-card-section>

          <q-card-section class="q-pt-none text-center">
            You didn’t quite make it this time. Your score was 80%. You need to
            get 100% to earn your certification.
          </q-card-section>

          <q-card-section class="flex justify-center q-my-lg">
            <q-btn
              flat
              no-caps
              label="Retake Quiz"
              class="bg-accent text-white q-px-lg"
            />
          </q-card-section>
        </q-card>
      </q-dialog> -->
    </div>
  </div>
</template>

<script setup>
import { quizData } from "../../DATA";
import { ref } from "vue";

let alert = ref(false);

const showArchiveDialog = () => {
  alert.value = true;
};
</script>
