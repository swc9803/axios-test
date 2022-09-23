<template>
  <div class="container">
    <h2>Todo List</h2>
    <input v-model="searchText" type="text" placeholder="Search" />
    <hr />
    <TodoSimpleForm @add-todo="addTodo" />
    <p v-show="!todos.length">There are no added todos</p>
    <TodoList
      :todos="filteredTodos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
    <hr />
    <ul class="pagenation">
      <button v-show="currentPage !== 1">prev</button>
      <li
        v-for="page in numberOfPages"
        :key="page"
        class="page"
        :style="currentPage === page ? 'background: skyblue' : ''"
      >
        <a @click="getTodos(page)">{{ page }}</a>
      </li>
      <button v-show="numberOfPages !== currentPage">next</button>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import TodoSimpleForm from "@/components/TodoSimpleForm.vue";
import TodoList from "@/components/TodoList.vue";
import axios from "axios";
import { TodoType } from "@/type/index";

const todos = ref<TodoType[]>([]);
const numberOfTodos = ref<number | string | any>(0);
const limit = 5;
const currentPage = ref<number>(1);

const numberOfPages = computed(() => {
  return Math.ceil(numberOfTodos.value / limit);
});

const getTodos = async (page = currentPage.value) => {
  currentPage.value = page;
  try {
    const res = await axios.get(
      `http://localhost:3000/todos?_page=${page}&_limit=${limit}`
    );
    numberOfTodos.value = res.headers["x-total-count"];
    todos.value = res.data;
  } catch (err) {
    console.log(err);
  }
};
getTodos();

const addTodo = async (todo: TodoType) => {
  try {
    const res = await axios.post("http://localhost:3000/todos", {
      subject: todo.subject,
      completed: todo.completed,
    });
    todos.value.push(res.data);
  } catch (err) {
    console.log(err);
  }
};
const toggleTodo = async (index: number) => {
  const id = todos.value[index].id;
  try {
    await axios.patch(`http://localhost:3000/todos/${id}`, {
      completed: !todos.value[index].completed,
    });
    todos.value[index].completed = !todos.value[index].completed;
  } catch (err) {
    console.log(err);
  }
};
const deleteTodo = async (index: number) => {
  const id = todos.value[index].id;
  try {
    await axios.delete(`http://localhost:3000/todos/${id}`);
    todos.value.splice(index, 1);
  } catch (err) {
    console.log(err);
  }
};

const searchText = ref("");

const filteredTodos = computed(() => {
  if (searchText.value) {
    return todos.value.filter((todo) => {
      return todo.subject.includes(searchText.value);
    });
  }
  return todos.value;
});
</script>

<style lang="scss" scoped>
.container {
  .pagenation {
    display: flex;
    gap: 10px;
    .page {
      list-style: none;
      cursor: pointer;
    }
  }
}
</style>
