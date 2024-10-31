<template>
  <img
    class="hlogo"
    :src="src"
    :style="{
      width: px(props.width),
      height: px(props.height),
    }"
  />
</template>

<script setup>
import { px } from "src/lib/utils";
import { HLOGO_HEIGHT } from "src/lib/vars";

const props = defineProps({
  src: { type: String, default: "../assets/interlinkiq-v3.png" },
  width: { type: [String, Number, null], default: "auto" },
  height: { type: [String, Number, null], default: HLOGO_HEIGHT },
});
</script>
