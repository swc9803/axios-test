<template>
  <div class="container">
    <h2>Todo List</h2>
    <input
      v-model="searchText"
      type="text"
      placeholder="Search"
      @keyup.enter="searchTodo"
    />
    <hr />
    <TodoSimpleForm @add-todo="addTodo" />
    <p v-show="!todos.length">There are no added todos</p>
    <TodoList
      :todos="todos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
    <hr />
    <ul class="pagenation">
      <button v-show="currentPage !== 1" @click="getTodos(currentPage - 1)">
        prev
      </button>
      <li
        v-for="page in numberOfPages"
        :key="page"
        class="page"
        :style="currentPage === page ? 'background: skyblue' : ''"
      >
        <a @click="getTodos(page)">{{ page }}</a>
      </li>
      <button
        v-show="numberOfPages !== currentPage"
        @click="getTodos(currentPage + 1)"
      >
        next
      </button>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import TodoSimpleForm from "@/components/TodoSimpleForm.vue";
import TodoList from "@/components/TodoList.vue";
import axios from "axios";
import { TodoType } from "@/type/index";

// json 서버 열기
// json-server --watch db.json --port 3000

const todos = ref<TodoType[]>([]);
const numberOfTodos = ref<number>(0);
const limit = 5;
const currentPage = ref<number>(1);
const searchText = ref("");

const numberOfPages = computed(() => {
  return Math.ceil(numberOfTodos.value / limit);
});

const getTodos = async (page = currentPage.value) => {
  currentPage.value = page;
  try {
    const res = await axios.get(
      `http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
    );
    numberOfTodos.value = res.headers["x-total-count"] as unknown as number;
    todos.value = res.data;
  } catch (err) {
    console.log(err);
  }
};
getTodos();

const addTodo = async (todo: TodoType) => {
  try {
    await axios.post("http://localhost:3000/todos", {
      subject: todo.subject,
      completed: todo.completed,
    });
    getTodos(1);
  } catch (err) {
    console.log(err);
  }
};
const toggleTodo = async (index: number, checked: boolean) => {
  const id = todos.value[index].id;
  try {
    await axios.patch(`http://localhost:3000/todos/${id}`, {
      completed: checked,
    });
    todos.value[index].completed = checked;
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

let timeout = 0;
const searchTodo = () => {
  clearTimeout(timeout);
  getTodos(1);
};
watch(searchText, () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    getTodos(1);
  }, 1000);
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
