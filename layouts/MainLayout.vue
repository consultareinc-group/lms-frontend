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
          v-if="leftDrawerOpen"
          class="row justify-center items-center full-height q-pa-none"
          :style="{
            flex: ` 0 0 ${px(SIDEBAR_WIDTH)}`,
          }"
        >
          <brand-logo />
        </q-toolbar-title>

        <!-- sidebar toggle -->
        <q-btn dense flat icon="menu" class="q-ml-sm" @click="toggleLeftDrawer" />

        <div class="q-ml-auto q-px-md full-height">
          <q-btn-dropdown flat :ripple="false" no-caps class="full-height">
            <template v-slot:label>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar.png" />
              </q-avatar>
              <span class="q-ml-md text-grey-9">Jane Doe</span>
            </template>
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Photos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Videos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Articles</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered :width="SIDEBAR_WIDTH" class="bg-dark">
      <q-list>
        <template v-for="link in sidebarLinks" :key="link.title">
          <nav-item v-if="!link.children" v-bind="link" />
          <nav-item-expanded v-else v-bind="link" />
        </template>
      </q-list>
    </q-drawer>

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
import sidebarLinks from "src/lib/sidebar-links";
import NavItem from "src/components/sidebar-nav/NavItem.vue";
import NavItemExpanded from "src/components/sidebar-nav/NavItemExpanded.vue";

const leftDrawerOpen = ref(false);

import { px } from "src/lib/utils";

defineOptions({
  name: "MainLayout",
});

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
