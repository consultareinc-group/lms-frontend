<template>
  <div class="row justify-start">
    <!-- Banner -->
    <div class="banner">
      <img
        src="../../assets/banner.jpg"
        alt="Courses Banner"
        class="banner-image"
      />
      <div class="overlay">
        <h1 class="banner-text">COURSES</h1>
      </div>
    </div>

    <div class="col-12 q-mt-sm q-mb-xl q-pa-xl">
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

          <q-ajax-bar
            ref="bar"
            position="top"
            color="accent"
            size="15px"
            skip-hijack
          />

          <div class="row items-center q-gutter-md">
            <span>Category: </span>
            <q-select
              outlined
              dense
              v-model="category"
              :options="categoryOptions"
              @update:model-value="updateCategory"
            />
          </div>
        </div>
      </div>

      <CardLoader v-if="loading" />
      <div v-else>
        <div
          v-if="courses.length > 0"
          class="row justify-center q-mt-xl full-width"
        >
          <div class="card-grid">
            <div v-for="course in courses" :key="course.id">
              <q-card class="card" style="position: relative">
                <div v-if="isValidVideo(course.video_link)">
                  <iframe
                    :src="getEmbedUrl(course.video_link)"
                    :title="course.course_name"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    style="width: 100%; height: 200px"
                  ></iframe>
                </div>
                <div v-else>
                  <img
                    src="../../assets/video image placeholder.jpg"
                    :alt="course.course_name"
                    style="width: 100%; height: 200px; object-fit: fill"
                  />
                </div>
                <q-card-section>
                  <div class="clamp-title text-h6">
                    {{ capitalizeCourseName(course.course_name) }}
                  </div>
                  <div class="clamp-description">
                    {{ course.course_description }}
                  </div>
                </q-card-section>

                <!-- add category name as tag -->
                <div
                  :class="
                    course.category_name ? 'justify-between' : 'justify-end'
                  "
                  class="row items-center full-width q-px-lg no-wrap"
                  style="position: absolute; bottom: 20px"
                >
                  <q-chip
                    v-if="course.category_name"
                    :label="course.category_name"
                    color="accent"
                    text-color="white"
                    style="
                      border-radius: 16px;
                      font-size: 12px;
                      max-width: 200px;
                    "
                  />
                  <q-btn
                    @click.stop="viewCourseDetails(course.id)"
                    color="primary"
                    label="View Course"
                  />
                </div>
              </q-card>
            </div>
          </div>
        </div>
        <div v-else class="text-center q-mt-xl">
          <h5 class="text-grey-7">
            <b>There are no courses found.</b>
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCourseStore } from "../../stores/course-store";
import { useCategoryStore } from "../../stores/category-store";

import CardLoader from "./CardLoader.vue";

// Variables
const router = useRouter();
const route = useRoute();
const courseStore = useCourseStore();
const categoryStore = useCategoryStore();

const courses = ref([]);
const loading = ref(false);

const search_keyword = ref("");
const bar = ref(null);

const category = ref("All");
const categoryOptions = ref([{ label: "All", value: "" }]);
const categoryId = ref(null);

// Lifecycle Hooks
onMounted(() => {
  getCategories();

  if (route.params.category_id && route.params.category_name) {
    category.value = route.params.category_name;
    categoryId.value = +route.params.category_id;
    search();
  } else {
    getCourses();
  }
});

// Functions
const getCategories = () => {
  categoryStore
    .GetCategories({ offset: categoryOptions.value.values.length })
    .then((response) => {
      response.data.forEach((data) => {
        categoryOptions.value.push({
          label: data.category_name,
          value: data.id,
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const getCourses = () => {
  loading.value = true;

  courseStore
    .GetPublishedCourses({ offset: courses.value.length })
    .then((response) => {
      if (response.status === "success") {
        courses.value = [];

        response.data.forEach((data) => {
          courses.value.push(data);
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
  loading.value = true;
  const barRef = bar.value;
  barRef.start();

  courseStore
    .SearchPublishedCourses({
      keyword: search_keyword.value,
      category_id: categoryId.value,
    })
    .then((response) => {
      if (response.status === "success") {
        courses.value = [];
        courses.value = response.data;
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loading.value = false;
      barRef.stop();
    });
};

const getEmbedUrl = (url) => {
  if (url.includes("youtube.com")) {
    const videoId = url.split("v=")[1];
    if (videoId) {
      const ampersandPosition = videoId.indexOf("&");
      if (ampersandPosition !== -1) {
        return `https://www.youtube.com/embed/${videoId.substring(
          0,
          ampersandPosition
        )}`;
      }
      return `https://www.youtube.com/embed/${videoId}`;
    }
  } else if (url.includes("youtu.be")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  } else if (url.includes("drive.google.com")) {
    const fileId = url.split("/file/d/")[1]?.split("/")[0];
    if (fileId) {
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
  }
  return url;
};

const isValidVideo = (url) => {
  return (
    url.includes("youtube.com") ||
    url.includes("youtu.be") ||
    url.includes("drive.google.com")
  );
};

const viewCourseDetails = (id) => {
  router.push({ name: "CourseDetails", params: { id } });
};

const capitalizeCourseName = (name) => {
  return name.replace(/\b\w/g, (char) => char.toUpperCase());
};

const updateCategory = (val) => {
  categoryId.value = val.value;

  // update route query
  router.push({
    query: {
      category_id: categoryId.value,
      category_name: val.label,
    },
  });
  search();
};
</script>

<style scoped>
.banner {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}
.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner-text {
  color: white;
  font-size: 48px;
  font-weight: bold;
}

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

@media (max-width: 1350px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
    width: 800px;
  }
}

@media (max-width: 900px) {
  .card-grid {
    grid-template-columns: 1fr;
    width: 400px;
  }
}

.card {
  height: 440px;
  width: 100%;
  transition: transform 0.1s ease;
  width: 400px !important;
}

.card:hover {
  transform: scale(1.05);
}
</style>
