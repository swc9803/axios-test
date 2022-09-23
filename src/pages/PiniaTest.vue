<template>
  <h1>Name is {{ userStore.user.name }}</h1>
  <h2>Email is {{ userStore.user.email }}</h2>
  <h2>Website is {{ userStore.website }}</h2>
  <input v-model="nameInput" type="text" placeholder="New name" />
  <button @click="handleSubmit(nameInput)">Change Name</button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/store/userStore";

const userStore = useUserStore();

const nameInput = ref();
const namearray = ref<string[]>([]);

const handleSubmit = (name: string) => {
  userStore.changeName(nameInput.value);
  namearray.value.push(name);

  nameInput.value = "";
};
</script>

<style lang="scss" scoped>
h2 {
  display: inline-block;
  width: 100%;
}
</style>
