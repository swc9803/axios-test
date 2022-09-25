<template>
  <div
    v-for="(todo, index) in todos"
    :key="todo.id"
    @click="moveToPage(todo.id)"
  >
    <input
      :checked="todo.completed"
      type="checkbox"
      @change="toggleTodo(index, $event)"
      @click.stop
    />
    <label :class="{ completed: todo.completed }">{{ todo.subject }}</label>
    <button @click.stop="deleteTodo(index)">Delete</button>
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from "vue";
import { useRouter } from "vue-router";
import { TodoType } from "@/type/index";
// eslint-disable-next-line no-undef
const props = defineProps<{
  todos: TodoType[];
}>();

const router = useRouter();

// watch는 값이 변경되면 특정 함수 실행 가능
// watchEffect는 값이 변경되는 변수를 포함하는 함수 실행
watchEffect(() => {
  // reactive 변수만 감지
  console.log(`현재 페이지의 todo 개수: ${props.todos.length}`);
});

// eslint-disable-next-line no-undef
const emit = defineEmits(["toggle-todo", "delete-todo"]);
const toggleTodo = (index: number, event: Event) => {
  emit("toggle-todo", index, (event.target as HTMLInputElement).checked);
};
const deleteTodo = (index: number) => {
  emit("delete-todo", index);
};

const moveToPage = (todoId: number) => {
  //   router.push(`/todos/${todoId}`);
  router.push({
    name: "Todo",
    params: {
      id: todoId,
    },
  });
};
</script>

<style lang="scss" scoped>
.completed {
  color: gray;
  text-decoration: line-through;
}
</style>
