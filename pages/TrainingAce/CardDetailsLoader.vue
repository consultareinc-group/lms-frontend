<template>
  <div class="row justify-center q-pa-xl">
    <div class="col items-center q-mt-sm q-mb-xl" style="max-width: 1200px">
      <div class="skeleton skeleton-title q-mb-lg"></div>
      <div class="skeleton skeleton-iframe q-mb-lg"></div>
      <div class="skeleton skeleton-description q-mt-lg"></div>
      <div class="skeleton skeleton-thumbnail q-mt-lg"></div>
      <div class="skeleton skeleton-button q-mt-xl"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.skeleton {
  background: #e0e0e0;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.skeleton::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: pulse 1.5s infinite;
}

.skeleton-title {
  height: 24px;
  width: 100%;
  margin: 0 auto 20px;
}

.skeleton-iframe {
  height: 300px;
  width: 100%;
}

.skeleton-description {
  height: 16px;
  width: 100%;
}

.skeleton-thumbnail {
  height: 200px;
  width: 30%;
}

.skeleton-button {
  height: 40px;
  width: 30%;
}

@keyframes pulse {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
