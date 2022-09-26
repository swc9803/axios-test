import { onUnmounted, ref } from "vue";
export const useToast = () => {
  const toastMessage = ref("");
  const showToast = ref(false);
  const toastTimeout = ref(0);

  const triggerToast = (message: string) => {
    toastMessage.value = message;
    showToast.value = true;
    toastTimeout.value = setTimeout(() => {
      toastMessage.value = "";
      showToast.value = false;
    }, 2000);
  };
  onUnmounted(() => {
    clearTimeout(toastTimeout.value);
  });
  return {
    toastMessage,
    showToast,
    triggerToast,
  };
};
