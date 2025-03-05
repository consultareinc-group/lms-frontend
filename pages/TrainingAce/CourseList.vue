<template>
  <div class="row justify-start q-pa-xl">
    <div class="col-12 q-mt-sm q-mb-xl">
      <h4 class="q-ma-none text-grey-9 text-center">
        <b>Courses</b>
      </h4>

      <div class="flex justify-end q-mb-md q-mt-xl">
        <div class="flex justify-end items-center q-gutter-x-md">
          <q-input
            v-model="search_keyword"
            placeholder="Search a course"
            outlined
            dense
            class="bg-white"
            debounce="1000"
            @update:model-value="search"
            style="width: 400px"
          />

          <q-select
            outlined
            dense
            v-model="category"
            :options="categoryOptions"
          />
        </div>
      </div>

      <CardLoader v-if="loading" />
      <div v-else class="row justify-center q-mt-xl full-width">
        <div class="card-grid">
          <div v-for="course in courses" :key="course.id">
            <q-card @click="viewCourseDetails(course.id)" class="card">
              <iframe
                :src="getEmbedUrl(course.video_link)"
                :title="course.course_name"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                style="width: 100%; height: 200px"
              ></iframe>
              <q-card-section>
                <div class="clamp-title text-h6">
                  {{ capitalizeCourseName(course.course_name) }}
                </div>
                <div class="clamp-description">
                  {{ course.course_description }}
                </div>
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
import { useCourseStore } from "../../stores/course-store";

import CardLoader from "./CardLoader.vue";

// Variables
const router = useRouter();
const courseStore = useCourseStore();

const courses = ref([]);
const loading = ref(false);

const search_keyword = ref("");

const category = ref("All");
const categoryOptions = [
  { label: "All", value: "" },
  { label: "Course 1", value: "Course 1" },
  { label: "Course 2", value: "Course 2" },
  { label: "Course 3", value: "Course 3" },
];

// Lifecycle Hooks
onMounted(() => {
  getCourses();
});

// Functions
const getCourses = () => {
  loading.value = true;

  courseStore
    .GetCourses({ offset: courses.value.length })
    .then((response) => {
      if (response.status === "success") {
        response.data.forEach((data) => {
          if (data.status === 1) {
            courseStore.GetCourse({ id: data.id }).then((response) => {
              const courseDetails = {
                ...response.data,
              };

              courses.value.push(courseDetails);
            });
          }
        });
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loading.value = false;
    });
};

const search = () => {
  console.log(search_keyword.value);
};

const getEmbedUrl = (url) => {
  const videoId = url.split("v=")[1];
  const ampersandPosition = videoId.indexOf("&");
  if (ampersandPosition !== -1) {
    return `https://www.youtube.com/embed/${videoId.substring(
      0,
      ampersandPosition
    )}`;
  }
  return `https://www.youtube.com/embed/${videoId}`;
};

const viewCourseDetails = (id) => {
  router.push({ name: "CourseDetails", params: { id } });
};

const capitalizeCourseName = (name) => {
  return name.replace(/\b\w/g, (char) => char.toUpperCase());
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
