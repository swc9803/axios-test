<template>
  <div>{{ message }}</div>
</template>
<script setup lang="ts">
import { toRefs } from "vue";
// eslint-disable-next-line no-undef
const props = defineProps<{
  message: string;
}>();
const { message } = toRefs(props);
</script>

<style lang="scss" scoped>
div {
  position: fixed;
  top: 5%;
  right: 20%;
  background: skyblue;
}
</style>
