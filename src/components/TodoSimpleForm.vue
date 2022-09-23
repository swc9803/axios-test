<template>
  <form @submit.prevent="onSubmit">
    <input v-model="todoRef" type="text" placeholder="input todo" />
    <button class="btn" type="submit">Add</button>
    <p v-show="hasError">Input is empty!</p>
  </form>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
const todoRef = ref<string>("");
const hasError = ref<boolean>(false);

const emit = defineEmits(["add-todo"]);

const onSubmit = () => {
  if (todoRef.value === "") {
    hasError.value = true;
  } else {
    emit("add-todo", {
      id: Date.now(),
      subject: todoRef.value,
      completed: false,
    });
    hasError.value = false;
    todoRef.value = "";
  }
};
</script>
