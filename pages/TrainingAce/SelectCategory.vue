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
      <!-- <CardLoader v-if="loading" /> -->
      <div>
        <div
          v-if="categories.length > 0"
          class="row justify-center q-mt-xl full-width"
        >
          <div class="card-grid">
            <div v-for="category in categories" :key="category.id">
              <q-card
                @click="selectCategory(category)"
                class="card"
                style="position: relative"
              >
                <q-card-section>
                  {{ category.name }}
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

// Variables
const router = useRouter();
const categoryStore = useCategoryStore();
const categories = ref([]);

// Lifecycle Hooks
onMounted(() => {
  getCategories();
});

// Functions
const getCategories = () => {
  categoryStore
    .GetCategories({ offset: categories.value.values.length })
    .then((response) => {
      response.data.forEach((data) => {
        categories.value.push({
          id: data.id,
          name: data.category_name,
          description: data.category_description,
        });
      });
    })
    .catch((error) => {
      console.log(error);
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
  grid-template-columns: repeat(4, 1fr);
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
  height: 100%;
  width: 100%;
  min-height: 200px;
  transition: transform 0.1s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  font-weight: 700;
  white-space: normal;
}

.card:hover {
  transform: scale(1.05);
}
</style>
