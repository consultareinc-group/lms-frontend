<template>
  <div class="row items-center justify-between" style="height: 100vh">
    <div class="col-6 text-center q-gutter-lg">
      <div class="q-gutter-md">
        <div class="text-h4 text-cyan text-weight-bold">
          Certificate of Completion
        </div>
        <div class="text-h5 text-weight-medium">Congratulations, John Doe!</div>
      </div>
      <div>
        <p
          class="text-subtitle1"
          style="text-align: center; margin: 0 auto; max-width: 400px"
        >
          You have demonstrated exceptional knowledge and mastery by completing
          the quiz Quiz 1 as part of the Course 1 course.
        </p>
      </div>
      <div class="q-gutter-md">
        <q-btn
          label="Browse More Courses"
          no-caps
          rounded
          class="text-black q-px-xl"
        />
        <q-btn
          label="Take Another Quiz"
          :to="{ name: 'List of Quizzes' }"
          no-caps
          rounded
          class="bg-accent text-white q-px-xl"
        />
      </div>
    </div>
    <div
      class="col-6"
      style="
        height: 100%;
        background: rgb(4, 42, 81);
        background: linear-gradient(
          90deg,
          rgba(4, 42, 81, 1) 0%,
          rgba(74, 143, 212, 1) 100%
        );
      "
    >
      <div
        class="q-gutter-xl justify-center items-center column"
        style="height: 100%"
      >
        <div class="text-h5 text-white text-start">Preview:</div>
        <div>
          <img :src="certificate" alt="certificate-image" />
        </div>
        <q-btn
          label="Download Certificate"
          no-caps
          rounded
          class="bg-accent text-white q-px-xl"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import certificate from "../../../assets/certificate.png";
</script>
