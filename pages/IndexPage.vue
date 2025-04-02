<template>
  <q-page class="q-pa-md column">
    <page-breadcrumbs
      title="Course Management"
      :items="[
        {
          label: 'Learning Management System',
          icon: 'home',
          to: { name: 'Nav1' },
        },
        {
          label: 'Course Management',
          icon: 'home',
          to: { name: 'Course Management' },
        },
      ]"
    />
    <div class="col-grow items-center justify-center column">
      <span class="text-h4">Path: {{ route.path }}</span>
      <span class="text-h4">Name: {{ route.name }}</span>
    </div>
  </q-page>
</template>

<script setup>
import PageBreadcrumbs from "src/components/PageBreadcrumbs.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>
