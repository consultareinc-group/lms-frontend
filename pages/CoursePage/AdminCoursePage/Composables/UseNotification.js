import { useQuasar } from "quasar";

export function useNotification() {
  const $q = useQuasar();

  function showNotif(
    message = "<p class='q-mb-none text-green'><span class='text-weight-bold'>Success</span>. The record has been added.</p>",
    color = "green-2"
  ) {
    $q.notify({
      message,
      color,
      position: "top-right",
      textColor: "green",
      actions: [{ icon: "close", color: "green", round: true }],
      html: true,
    });
  }

  return { showNotif };
}
