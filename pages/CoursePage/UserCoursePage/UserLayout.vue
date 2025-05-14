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

        <div
          v-if="
            authStore.UserInformation &&
            Object.keys(authStore.UserInformation).length > 0
          "
          class="q-ml-auto q-px-xl full-height flex items-center"
        >
          <q-btn
            v-if="authStore.UserInformation.role === 0"
            label="Course Management Dashboard"
            no-caps
            rounded
            class="bg-accent text-white q-px-xl q-py-sm q-mr-sm"
            :to="{ name: 'Course Management' }"
          />

          <q-btn
            label="View All Courses"
            no-caps
            rounded
            class="bg-accent text-white q-px-xl q-py-sm"
            @click="browseMoreCourses"
          />

          <div class="q-ml-auto q-px-md full-height">
            <q-btn-dropdown flat :ripple="false" no-caps class="full-height">
              <template v-slot:label>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/avatar.png" />
                </q-avatar>
                <span class="q-ml-md text-grey-9"
                  >{{ authStore.UserInformation.first_name }},
                  {{ authStore.UserInformation.last_name }}</span
                >
              </template>
              <q-list>
                <q-item
                  clickable
                  v-close-popup
                  :to="{
                    name: 'My Certificates',
                    params: { user_id: authStore.UserInformation.id },
                  }"
                >
                  <q-item-section>
                    <q-item-label>My Certificates</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="logout">
                  <q-item-section>
                    <q-item-label>Sign out</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </div>
        <div v-else class="q-ml-auto q-px-md full-height flex items-center">
          <q-btn
            label="Login"
            no-caps
            rounded
            class="bg-accent text-white q-px-xl q-py-sm"
            @click="showLoginDialog = true"
          />
        </div>
      </q-toolbar>
    </q-header>

    <LoginDialog
      v-model="showLoginDialog"
      @close="closeDialog"
      @register="handleRegister"
    ></LoginDialog>

    <RegisterDialog
      v-model="showRegisterDialog"
      @close="closeDialog"
      @login="handleLogin"
    ></RegisterDialog>

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
import { px } from "src/lib/utils";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";

import { useAuthStore } from "src/stores/auth";

import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "src/lib/vars";
import BrandLogo from "src/components/BrandLogo.vue";

import LoginDialog from "../../TrainingAce/components/LoginDialog.vue";
import RegisterDialog from "../../TrainingAce/components/RegisterDialog.vue";

// Variables
const route = useRoute();
const router = useRouter();
const $q = useQuasar();
const authStore = useAuthStore();
// const leftDrawerOpen = ref(false);

const showLoginDialog = ref(false);
const showRegisterDialog = ref(false);

defineOptions({
  name: "UserLayout",
});

// Functions
// function toggleLeftDrawer() {
//   leftDrawerOpen.value = !leftDrawerOpen.value;
// }

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

const logout = () => {
  authStore.LogoutUser().finally(() => {
    router.push({ name: "Select Category" });
  });

  authStore.UserInformation = {};

  $q.notify({
    message: `<p class='q-mb-none'>You have successfully logged out.</p>`,
    color: "green-2",
    position: "top",
    textColor: "green",
    html: true,
  });
};

const closeDialog = () => {
  showLoginDialog.value = false;
  showRegisterDialog.value = false;
};

const handleLogin = () => {
  showLoginDialog.value = true;
  showRegisterDialog.value = false;
};

const handleRegister = () => {
  showLoginDialog.value = false;
  showRegisterDialog.value = true;
};
</script>
