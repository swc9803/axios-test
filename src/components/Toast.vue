<template>
  <div>{{ toastMessage }}</div>
</template>
<script setup lang="ts">
import { ref } from "vue";
// eslint-disable-next-line no-undef
const props = defineProps<{
  message: string;
}>();
const toastMessage = ref<string>("");
// eslint-disable-next-line vue/no-setup-props-destructure
toastMessage.value = props.message;
</script>

<style lang="scss" scoped>
div {
  position: fixed;
  top: 5%;
  right: 20%;
  background: skyblue;
}
</style>
