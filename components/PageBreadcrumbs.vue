<template>
  <h4 class="q-ma-none text-weight-light text-grey-9 q-mb-md">{{ props.title }}</h4>
  <div class="bg-white q-py-sm q-px-md q-mb-md">
    <q-breadcrumbs class="text-grey-8" gutter="none">
      <template v-slot:separator>
        <q-icon size="1.5em" name="chevron_right" color="grey-8" class="q-mx-sm" />
      </template>

      <q-breadcrumbs-el label="Home" icon="home" exact :to="{ name: 'Home' }" class="text-grey-8" active-class="current" />

      <q-breadcrumbs-el
        v-for="({ icon, label, ...item }, index) in props.items || []"
        :key="index"
        :label="label"
        :icon="icon"
        class="text-grey-8"
        active-class="current"
        v-bind="resolveLinkProps(item)"
      />
    </q-breadcrumbs>
  </div>
</template>

<script setup>
import { resolveLinkProps } from "src/lib/utils";

/**
 * props.items properties:
 * {
 *  icon,
 *  label,
 *  to,
 *  href,
 *  target,
 * }
 */

const props = defineProps({
  items: {
    type: Array,
    required: false,
  },
  title: {
    type: String,
    default: "Insert Page Title",
  },
});
</script>

<style lang="scss">
.q-breadcrumbs__el {
  &:last-child {
    color: inherit;
    font-weight: inherit;
  }
  &.current {
    color: $grey-6 !important;
  }
}
</style>
