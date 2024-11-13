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
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { quizData } from "../DATA";
</script>
