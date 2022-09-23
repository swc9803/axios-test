<template>
  <div class="container">
    <h2>Todo List</h2>
    <TodoSimpleForm @add-todo="addTodo" />
    <p v-show="!todos.length">There are no added todos</p>
    <TodoList
      :todos="todos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TodoSimpleForm from "@/components/TodoSimpleForm.vue";
import TodoList from "@/components/TodoList.vue";
import { TodoType } from "@/type/index";

const todos = ref<TodoType[]>([]);

const addTodo = (todoRef: TodoType): void => {
  todos.value.push(todoRef);
};

const toggleTodo = (index: number) => {
  todos.value[index].completed = !todos.value[index].completed;
};

const deleteTodo = (index: number) => {
  todos.value.splice(index, 1);
};
</script>

<style lang="scss" scoped>
h2 {
  display: inline-block;
  width: 100%;
}
.completed {
  color: gray;
  text-decoration: line-through;
}
</style>
