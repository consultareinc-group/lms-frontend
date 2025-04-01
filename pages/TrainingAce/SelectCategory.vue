<template>
  <div class="row justify-start">
    <!-- Banner -->
    <div class="banner">
      <img
        src="../../assets/banner-category.jpg"
        alt="Courses Banner"
        class="banner-image"
      />
      <div class="overlay">
        <h1 class="banner-text">Select A Category</h1>
      </div>
    </div>

    <div class="col-12 q-mt-sm q-mb-xl q-pa-xl">
      <CardLoader v-if="loading" />
      <div v-else>
        <div
          v-if="categories.length > 0"
          class="row justify-center q-mt-xl full-width"
        >
          <div class="card-grid">
            <div v-for="category in categories" :key="category.id">
              <q-card @click="selectCategory(category)" class="card">
                <q-img
                  v-if="
                    category.thumbnail !== null && category.thumbnail !== ''
                  "
                  :src="category.thumbnail"
                  :alt="category.course_name"
                  style="
                    width: 100%;
                    height: 300px;
                    object-fit: fill !important;
                  "
                />
                <q-img
                  v-else
                  src="../../assets/video image placeholder.jpg"
                  :alt="category.course_name"
                  style="
                    width: 100%;
                    height: 300px;
                    object-fit: fill !important;
                  "
                />
                <q-card-section class="q-pa-lg">
                  <div class="clamp-title text-h5 text-bold">
                    {{ category.name }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
        <div v-else class="text-center q-mt-xl">
          <h5 class="text-grey-7">
            <b
              >There are no categories found. System Administrators need to add
              a course first before a category is available.</b
            >
            <br />
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCategoryStore } from "../../stores/category-store";
import { useRouter } from "vue-router";
import CardLoader from "./CardLoader.vue";

// Variables
const router = useRouter();
const categoryStore = useCategoryStore();
const categories = ref([]);
const loading = ref(false);

// Lifecycle Hooks
onMounted(() => {
  getCategories();
});

// Functions
const getCategories = () => {
  loading.value = true;
  categoryStore
    .GetCategories({ offset: categories.value.values.length })
    .then((response) => {
      response.data.forEach((data) => {
        categories.value.push({
          id: data.id,
          name: data.category_name,
          description: data.category_description,
          thumbnail: data.image_file_base64,
        });
      });

      // convert thumbnail to base64
      categories.value.forEach((category) => {
        if (category.thumbnail !== "" && category.thumbnail !== null) {
          category.thumbnail = `data:image/png;base64,${category.thumbnail}`;
        }
      });

      console.log(categories.value);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loading.value = false;
    });
};

const selectCategory = (category) => {
  router.push({
    name: "Courses",
    params: { category_id: category.id, category_name: category.name },
  });
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
  cursor: pointer;
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}
</style>
