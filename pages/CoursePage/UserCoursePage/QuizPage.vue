<template>
  <div class="col-grow items-center justify-center column q-px-xl">
    <div
      class="bg-white q-my-lg q-gutter-md items-start justify-start column"
      style="width: 60vw"
    >
      <header class="q-ma-none q-px-xl q-pt-lg" style="width: 100%">
        <q-skeleton
          v-if="!quizStore.quiz.quiz_name"
          square
          height="30px"
          width="100%"
          class="q-mb-md"
        />
        <h5 v-else class="q-ma-none">
          {{ quizStore.quiz.quiz_name || "Quiz Name" }}
        </h5>
      </header>
      <q-separator dark />
      <q-skeleton
        v-if="!questionStore.questions.length"
        square
        height="30px"
        width="50%"
        class="q-mb-md"
      />
      <div v-else>
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
          :loading="btnloadingState"
        />
      </div>
      <q-dialog v-model="alert">
        <q-card class="q-px-xl relative-position">
          <q-card-section class="text-center q-mt-lg">
            <q-icon
              :name="
                quizStore.quizResult.status === 'passed'
                  ? 'celebration'
                  : 'error'
              "
              :color="
                quizStore.quizResult.status === 'passed'
                  ? 'orange-10'
                  : 'red-10'
              "
              size="lg"
            />
            <div class="text-h5 text-weight-bold">
              {{
                quizStore.quizResult.status === "passed"
                  ? "Congratulations"
                  : "Almost there"
              }}
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none text-center">
            <p v-if="quizStore.quizResult.status === 'passed'">
              You have achieved a {{ quizStore.quizResult.score }}% score! You
              are now eligible to receive your certification.
            </p>
            <p v-else>
              You didn’t quite make it this time. Your score is
              {{ quizStore.quizResult.score }}%. You need to get
              {{ quizStore.quizResult.passing_percentage }}% to earn your
              certification.
            </p>
          </q-card-section>
          <q-card-section class="flex justify-center q-mb-lg">
            <q-btn
              v-if="quizStore.quizResult.status === 'passed'"
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
} from "../../../stores/course-store";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";

const router = useRouter();
const route = useRoute();
let alert = ref(false);
const questionStore = useQuestionStore();
const quizStore = useQuizStore();
const logStore = useLogStore();
const $q = useQuasar();

const quizId = ref(route.params.quiz_id);
const userAnswers = ref({});

onMounted(() => {
  quizStore.fetchQuizData(quizId.value);
  questionStore.fetchQuestionAndChoices(quizId.value);
});

const btnloadingState = ref(false);
const submitQuiz = async () => {
  const unansweredQuestions = questionStore.questions.filter(
    (question) => !userAnswers.value[question.question_id]
  );

  if (unansweredQuestions.length > 0) {
    $q.notify("Please answer all the questions before submitting.");
    return;
  }

  btnloadingState.value = true;
  await quizStore.submitAnswers(userAnswers.value, quizId.value);

  if (quizStore.quizResult.status === "passed") {
    await logStore.postLogs();
  }

  alert.value = true;
  btnloadingState.value = false;
};

const navigateToCertification = () => {
  router.push({
    name: "Certification Page",
  });
};

const retakeQuiz = () => {
  questionStore.questions = [...questionStore.questions].sort(
    () => Math.random() - 0.5
  );
  userAnswers.value = {};
  alert.value = false;
};
</script>
