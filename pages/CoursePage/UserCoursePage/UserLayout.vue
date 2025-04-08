<template>
  <q-layout view="hHh LpR lff">
    <q-header
      elevated
      class="bg-white text-black"
      :style="{
        height: px(HEADER_HEIGHT),
      }"
    >
      <q-toolbar class="full-height q-pa-none">
        <q-toolbar-title
          class="row justify-center items-center full-height q-pa-none"
          :style="{
            flex: ` 0 0 ${px(SIDEBAR_WIDTH)}`,
          }"
        >
          <a href="https://trainingace.pro/">
            <brand-logo />
          </a>
        </q-toolbar-title>

        <div class="q-ml-auto q-px-xl full-height flex items-center">
          <q-btn
            label="Browse More Courses"
            no-caps
            rounded
            class="bg-accent text-white q-px-xl q-py-sm"
            @click="browseMoreCourses"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="">
      <router-view />
    </q-page-container>

    <!-- <q-footer bordered  class="bg-grey-8 text-white">
        <q-toolbar>
          <q-toolbar-title>
            <div>Title</div>
          </q-toolbar-title>
        </q-toolbar>
      </q-footer> -->
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "src/lib/vars";
import BrandLogo from "src/components/BrandLogo.vue";

// Variables
const route = useRoute();
const router = useRouter();
const $q = useQuasar();
const leftDrawerOpen = ref(false);

import { px } from "src/lib/utils";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";

defineOptions({
  name: "UserLayout",
});

// Functions
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const browseMoreCourses = () => {
  if (route.name === "Courses") {
    $q.notify({
      type: "info",
      message: "You are already in the Courses page",
      position: "top-right",
      timeout: 1000,
      classes: "quasar-notification-info",
    });
    return;
  }
  router.push({
    name: "Courses",
    params: { category_id: " ", category_name: "All" },
  });
};
</script>
