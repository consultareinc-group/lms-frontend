<template>
  <div class="row justify-start q-pa-xl">
    <div class="col-12 q-mt-sm q-mb-xl">
      <h4 class="q-ma-none text-grey-9 text-center">
        <b>Courses</b>
      </h4>

      <div class="flex justify-end q-mb-md q-mt-xl">
        <div class="flex justify-end items-center">
          <div class="q-mr-md">Search:</div>
          <q-input
            v-model="search_keyword"
            outlined
            dense
            class="bg-white"
            debounce="1000"
            @update:model-value="search"
            style="width: 400px"
          />
        </div>
      </div>

      <CardLoader v-if="loading" />
      <div v-else class="row justify-center q-mt-xl full-width">
        <div class="card-grid">
          <div v-for="course in courses" :key="course.id">
            <q-card @click="viewCourseDetails" class="card">
              <q-img :src="course.image" :alt="course.title" />
              <q-card-section>
                <div class="clamp-title text-h6">{{ course.title }}</div>
                <div class="clamp-description">{{ course.description }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import CardLoader from "./CardLoader.vue";

// Variables
const router = useRouter();
const courses = ref([]);
const loading = ref(false);

const search_keyword = ref("");

onMounted(() => {
  fetchSampleCourses();
});

const fetchSampleCourses = () => {
  loading.value = true;

  setTimeout(() => {
    courses.value = [
      {
        id: 1,
        title: "Course 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "https://cdn.quasar.dev/img/parallax1.jpg",
      },
      {
        id: 2,
        title: "Course 2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "https://cdn.quasar.dev/img/parallax2.jpg",
      },
      {
        id: 3,
        title: "Course 3",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "https://cdn.quasar.dev/img/parallax2.jpg",
      },
      {
        id: 4,
        title: "Course 4",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "https://cdn.quasar.dev/img/parallax1.jpg",
      },
      {
        id: 5,
        title: "Course 5",
        description: "Bla bla bla",
        image: "https://cdn.quasar.dev/img/parallax1.jpg",
      },
    ];

    loading.value = false;
  }, 1000);
};

const search = () => {
  console.log(search_keyword.value);
};

const viewCourseDetails = () => {
  router.push({ name: "CourseDetails", params: { id: 1 } });
};
</script>

<style scoped>
.clamp-title {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  margin-top: 10px;
  color: #333;
  font-size: 18px;
}

.clamp-description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  margin-top: 10px;
  color: #6e6e6e;
  font-size: 14px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  width: 1200px;
}

.card {
  height: 100%;
  width: 100%;
  transition: transform 0.1s ease;
  cursor: pointer;
}

.card:hover {
  transform: scale(1.05);
}
</style>
