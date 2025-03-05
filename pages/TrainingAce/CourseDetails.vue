<template>
  <div v-if="course" class="row justify-center q-pa-xl">
    <div class="col items-center q-mt-sm q-mb-xl" style="max-width: 1200px">
      <h4 class="q-ma-none text-grey-9 text-center q-mb-lg">
        <b>{{ capitalizeCourseName(course.course_name) }}</b>
      </h4>

      <iframe
        :src="getEmbedUrl(course.video_link)"
        :title="course.course_name"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        style="width: 100%; height: 600px"
      ></iframe>

      <div
        v-html="convertDescription(course.course_description)"
        class="q-mt-lg"
      ></div>

      <q-btn
        color="primary"
        label="Start Familiarization Certification"
        class="q-mt-xl hover-scale text-capitalize"
        :to="{ name: 'List of Quizzes', params: { course_id: course.id } }"
        icon-right="arrow_forward"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCourseStore } from "../../stores/course-store";
import { useRoute } from "vue-router";

// variables
const courseStore = useCourseStore();
const route = useRoute();

const course = ref({});

// lifecycle hooks
onMounted(() => {
  getCourse();
});

// functions
const getCourse = () => {
  courseStore.GetCourse({ id: +route.params.id }).then((res) => {
    course.value = res.data;
  });
};

const getEmbedUrl = (url) => {
  if (!url) return "";
  const videoId = url.split("v=")[1];
  if (!videoId) return "";
  const ampersandPosition = videoId.indexOf("&");
  if (ampersandPosition !== -1) {
    return `https://www.youtube.com/embed/${videoId.substring(
      0,
      ampersandPosition
    )}`;
  }
  return `https://www.youtube.com/embed/${videoId}`;
};

const capitalizeCourseName = (name) => {
  if (!name) return "";
  return name.replace(/\b\w/g, (char) => char.toUpperCase());
};

const convertDescription = (description) => {
  if (!description) return "";

  const urlRegex = /(https?:\/\/[^\s]+)/g;

  return description
    .split("\n")
    .map((line) =>
      line.replace(urlRegex, (url) => {
        return `
        <iframe
        src="${getEmbedUrl(url)}"
        title="course.course_name"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        style="width: 400px; height: 300px"
      ></iframe>`;
      })
    )
    .join("<br>");
};
</script>

<style scoped>
.hover-scale {
  transition: transform 0.1s ease;
}

.hover-scale:hover {
  transform: scale(1.05);
}
</style>
