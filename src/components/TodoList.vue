<template>
  <div v-for="(todo, index) in todos" :key="todo.id">
    <input
      :checked="todo.completed"
      type="checkbox"
      @change="toggleTodo(index)"
    />
    <label :class="{ completed: todo.completed }">{{ todo.subject }}</label>
    <button @click="deleteTodo(index)">Delete</button>
  </div>
</template>

<script setup lang="ts">
import { TodoType } from "@/type/index";
// eslint-disable-next-line no-undef
defineProps<{
  todos: TodoType[];
}>();

// eslint-disable-next-line no-undef
const emit = defineEmits(["toggle-todo", "delete-todo"]);
const toggleTodo = (index: number) => {
  emit("toggle-todo", index);
};
const deleteTodo = (index: number) => {
  emit("delete-todo", index);
};
</script>

<style lang="scss" scoped>
.completed {
  color: gray;
  text-decoration: line-through;
}
</style>
