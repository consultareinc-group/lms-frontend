<template>
  <div class="row justify-center q-pa-xl">
    <div class="col items-center q-mt-sm q-mb-xl" style="max-width: 1200px">
      <h4 class="q-ma-none text-grey-9 text-center">
        <b>Course 1</b>
      </h4>

      <q-img
        src="https://cdn.quasar.dev/img/parallax1.jpg"
        alt="Course 1"
        style="width: 100%; height: 600px"
        class="q-mt-lg"
      />

      <p class="q-mt-lg q-mb-lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>

      <q-btn
        color="primary"
        label="Start Course"
        class="q-mt-xl hover-scale"
        :to="{ name: 'List of Quizzes', params: { course_id: 106 } }"
        icon-right="arrow_forward"
      />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.hover-scale {
  transition: transform 0.1s ease;
}

.hover-scale:hover {
  transform: scale(1.05);
}
</style>
