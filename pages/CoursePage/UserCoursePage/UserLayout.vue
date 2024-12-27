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
          <brand-logo />
        </q-toolbar-title>

        <div class="q-ml-auto q-px-xl full-height flex items-center">
          <q-btn
            label="Browse More Courses"
            no-caps
            rounded
            class="bg-accent text-white q-px-xl q-py-sm"
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

const leftDrawerOpen = ref(false);

import { px } from "src/lib/utils";

defineOptions({
  name: "UserLayout",
});

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
