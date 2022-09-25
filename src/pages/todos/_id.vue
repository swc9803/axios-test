<template>
  <h1>Todo Page</h1>
  <div v-if="loading">loading...</div>
  <form v-else @submit.prevent="onSave">
    <div>
      <div>
        <label>Todo Subject</label>
        <input v-model="todo.subject" type="text" class="form-control" />
      </div>
      <button>{{ todo.completed ? "complete" : "imcomplete" }}</button>
    </div>
    <button type="submit">Save</button>
    <button @click="moveToTodoListPage">cancel</button>
  </form>
  <Toast v-if="showToast" :message="toastMessage" />
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Toast from "@/components/Toast.vue";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const todo = ref();
const loading = ref(true);
const todoId = route.params.id;

const toastMessage = ref("");
const showToast = ref(false);

const getTodo = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
    todo.value = res.data;
    loading.value = false;
  } catch (error) {
    console.log(error);
    triggerToast("error");
  }
};

const moveToTodoListPage = () => {
  router.push({ name: "Todos" });
};
getTodo();

const triggerToast = (message: string) => {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => {
    toastMessage.value = "";
    showToast.value = false;
  }, 3000);
};

const onSave = async () => {
  try {
    await axios.put(`http://localhost:3000/todos/${todoId}`, {
      subject: todo.value.subject,
      completed: todo.value.completed,
    });
    triggerToast("save completed");
  } catch (error) {
    console.log(error);
    triggerToast("error");
  }
};
</script>

<style lang="scss" scoped>
label {
  display: inline-block;
  width: 100%;
}
</style>
