export type SnackbarType = "success" | "error" | "warning" | "info";

interface SnackbarMessage {
  message: string;
  type: SnackbarType;
  timeout?: number;
  isVisible?: boolean;
}

export const useSnackbarStore = () => {
  // State for the current snackbar message
  const snackbar = useState<SnackbarMessage | null>("snackbar", () => null);

  // Show a snackbar message
  const showSnackbar = (
    message: string,
    type: SnackbarType = "info",
    timeout: number = 3000
  ) => {
    snackbar.value = {
      message,
      type,
      timeout,
      isVisible: true,
    };

    // Auto-hide after timeout
    if (timeout > 0) {
      setTimeout(() => {
        hideSnackbar();
      }, timeout);
    }
  };

  // Hide the snackbar
  const hideSnackbar = () => {
    if (snackbar.value) {
      snackbar.value = {
        ...snackbar.value,
        isVisible: false,
      };

      // Clear after animation completes
      setTimeout(() => {
        snackbar.value = null;
      }, 300);
    }
  };

  return {
    snackbar: readonly(snackbar),
    showSnackbar,
    hideSnackbar,
  };
};
