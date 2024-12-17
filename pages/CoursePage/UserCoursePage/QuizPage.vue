<template>
  <div class="col-grow items-center justify-center column q-px-xl">
    <div
      class="bg-white q-my-lg q-gutter-md items-start justify-start column"
      style="width: 60vw"
    >
      <header class="q-ma-none q-px-xl q-pt-lg" style="width: 100%">
        <h5 class="q-ma-none">{{ logStore.logs.quiz_name || "Quiz Name" }}</h5>
      </header>
      <q-separator dark />
      <div
        v-for="(question, index) in questionStore.questions"
        :key="question.question_id"
        class="q-my-lg q-px-xl q-mx-none"
      >
        <p>{{ index + 1 }}. {{ question.question_text }}</p>
        <q-option-group
          class="q-mb-md"
          :options="question.choices"
          option-label="choice_text"
          option-value="id"
          v-model="userAnswers[question.question_id]"
          type="radio"
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
          @click="submitQuiz"
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
            <q-icon
              :name="quizStore.status === 'passed' ? 'celebration' : 'error'"
              :color="quizStore.status === 'passed' ? 'orange-10' : 'red-10'"
              size="lg"
            />
            <div class="text-h5 text-weight-bold">
              {{
                quizStore.status === "passed"
                  ? "Congratulations"
                  : "Almost there"
              }}
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none text-center">
            <p v-if="quizStore.status === 'passed'">
              You have achieved a {{ quizStore.score }}% score! You are now
              eligible to receive your certification.
            </p>
            <p v-else>
              You didn’t quite make it this time. Your score is
              {{ quizStore.score }}%. You need to get 100% to earn your
              certification.
            </p>
          </q-card-section>
          <q-card-section class="flex justify-center q-mb-lg">
            <q-btn
              v-if="quizStore.status === 'passed'"
              flat
              no-caps
              @click="navigateToCertification"
              label="Proceed"
              class="bg-accent text-white q-px-lg"
            />
            <q-btn
              v-else
              flat
              no-caps
              label="Retake Quiz"
              class="bg-accent text-white q-px-lg"
              @click="retakeQuiz"
            />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {
  useQuestionStore,
  useQuizStore,
  useLogStore,
} from "src/resources/lms/stores/course-store";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
let alert = ref(false);
const questionStore = useQuestionStore();
const quizStore = useQuizStore();
const logStore = useLogStore();

const quizId = ref(route.params.quiz_id);
const userAnswers = ref({});
const logsId = ref(null);

onMounted(() => {
  logStore.loadLogsFromStorage();
  questionStore.fetchQuestionAndChoices(quizId.value);
});

const submitQuiz = async () => {
  await quizStore.submitAnswers(userAnswers.value);
  // if (quizStore.status === "passed") {
  //   logsId.value = await logStore.postLogs();
  // }
  logsId.value = 1;
  alert.value = true;
};

const navigateToCertification = () => {
  router.push({ name: "Certification Page", params: { logsId: logsId.value } });
};

const retakeQuiz = () => {
  questionStore.questions = questionStore.questions.sort(
    () => Math.random() - 0.5
  );
  userAnswers.value = {};
  alert.value = false;
};
</script>
