<template>
  <q-expansion-item :icon="props.icon" :label="props.title" expand-separator class="text-white sidebar-qitem">
    <template v-for="child in props.children" :key="child.title">
      <nav-item v-if="!child.children" v-bind="child" class="bg-primary" />
      <nav-item-expanded v-else v-bind="child" />
    </template>
  </q-expansion-item>
</template>

<script setup>
import NavItem from "./NavItem.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  caption: {
    type: String,
    default: "",
  },

  icon: {
    type: String,
    default: "",
  },

  children: {
    type: Array,
    required: true,
  },
});
</script>
