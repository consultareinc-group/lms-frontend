<template>
  <div class="row justify-center q-mt-xl full-width">
    <div class="card-grid">
      <div v-for="n in 6" :key="n">
        <q-card class="card">
          <div class="skeleton-img"></div>
          <q-card-section>
            <div class="skeleton-title"></div>
            <div class="skeleton-description"></div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  width: 1200px;
}

.skeleton-img,
.skeleton-title,
.skeleton-description {
  background: #e0e0e0;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

.skeleton-img {
  width: 100%;
  height: 200px;
}

.skeleton-title {
  width: 60%;
  height: 30px;
  margin: 10px 0;
}

.skeleton-description {
  width: 80%;
  height: 60px;
  margin: 5px 0;
}

@keyframes pulse {
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #f0f0f0;
  }
  100% {
    background-color: #e0e0e0;
  }
}
</style>
