import { defineStore } from "pinia";
import { reactive, computed } from "vue";

export const useUserStore = defineStore("list", () => {
  interface User {
    name: string;
    email: string;
  }
  const user = reactive<User>({
    name: "sungwoo",
    email: "swc9803@naver.com",
  });

  const website = computed((): string => {
    return user.email.substring(user.email.lastIndexOf("@") + 1);
  });

  const changeName = (newName: string) => {
    user.name = newName;
  };
  return {
    user,
    website,
    changeName,
  };
});
