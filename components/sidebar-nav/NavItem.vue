<template>
  <q-item clickable class="text-white sidebar-qitem q-py-md" v-bind="resolveLinkProps(props)">
    <q-item-section v-if="props.icon" avatar>
      <q-icon :name="props.icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
      <q-item-label v-if="caption" caption>{{ props.title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { resolveLinkProps } from "src/lib/utils";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  caption: {
    type: String,
    default: "",
  },

  to: {
    type: null,
    required: false,
  },

  href: {
    type: null,
    required: false,
  },

  icon: {
    type: String,
    default: "",
  },

  class: {
    type: String,
    default: "bg-primary",
  },
});
</script>
