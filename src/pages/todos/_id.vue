<template>
  <h1>Todo Page</h1>
  <TodoForm :editing="true" />
</template>

<script setup lang="ts">
import TodoForm from "@/components/TodoForm.vue";
</script>

<style lang="scss" scoped></style>
