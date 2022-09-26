<template>
  <div v-if="loading">loading...</div>
  <form v-else @submit.prevent="onSave">
    <div v-if="props.editing">
      <div>
        <label>Todo Subject</label>
        <input v-model="todo.subject" type="text" class="form-control" />
      </div>
      <button>{{ todo.completed ? "complete" : "imcomplete" }}</button>
      <label>Body</label>
      <textarea v-model="todo.body" cols="30" rows="10"></textarea>
    </div>
    <button type="submit">{{ editing ? "Update" : "Create" }}</button>
    <button @click="moveToTodoListPage">cancel</button>
  </form>
  <Toast v-if="showToast" :message="toastMessage" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Toast from "@/components/Toast.vue";
import { useToast } from "@/composable/toast";

// eslint-disable-next-line no-undef
const props = defineProps<{
  editing: {
    type: boolean;
    default: false;
  };
}>();

const route = useRoute();
const router = useRouter();
const todo = ref({
  subject: "",
  completed: false,
  body: "",
});
const loading = ref(false);
const todoId = route.params.id;

const { toastMessage, showToast, triggerToast } = useToast();

const getTodo = async () => {
  loading.value = true;
  try {
    const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
    todo.value = res.data;
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.log(error);
  }
};

const moveToTodoListPage = () => {
  router.push({ name: "Todos" });
};
if (props.editing) {
  getTodo();
}

const onSave = async () => {
  try {
    const data = {
      subject: todo.value.subject,
      completed: todo.value.completed,
      body: todo.value.body,
    };
    if (props.editing) {
      await axios.put(`http://localhost:3000/todos/${todoId}`, data);
    } else {
      await axios.post(`http://localhost:3000/todos`, data);
      todo.value.subject = "";
      todo.value.body = "";
    }
    const message = `Successfully ${props.editing ? "Updated" : "Created"}`;
    triggerToast(message);
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
