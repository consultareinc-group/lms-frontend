<template>
  <div class="q-pa-md">
    <q-page>
      <div class="q-gutter-md q-pa-md flex flex-center">
        <div class="text-center">
          <div v-if="route.params.message === 'Not Authorized.'">
            <h2 class="text-bold" style="color: #090e69">
              Not <span style="color: #ec1b23">Authorized</span>
            </h2>
            <p class="text-h5">You are not authorized to view this.</p>
          </div>

          <div v-else-if="route.params.message === 'Certificate not found.'">
            <h2 class="text-bold" style="color: #090e69">
              Certificate <span style="color: #ec1b23">Not</span> Found
            </h2>
            <p class="text-h5">
              The certificate you are trying to view does not exist.
            </p>
          </div>

          <div v-else-if="route.params.message === 'User not found.'">
            <h2 class="text-bold" style="color: #090e69">
              User <span style="color: #ec1b23">Not</span> Found
            </h2>
            <p class="text-h5">This user does not exist.</p>
          </div>

          <div v-else>
            <h2 class="text-bold" style="color: #090e69">
              Not <span style="color: #ec1b23">Found</span>
            </h2>
            <p class="text-h5">
              The page you are looking for does not exist or has been removed.
            </p>
          </div>

          <q-btn
            icon="arrow_back"
            label="Browse Courses"
            color="primary"
            class="q-mt-xl"
            :to="{ name: 'Courses' }"
          />
        </div>
      </div>
    </q-page>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style lang="scss" scoped></style>
