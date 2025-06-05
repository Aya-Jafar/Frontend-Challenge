import { useSnackbarStore } from "../snackbar";

const useToggleActions = () => {
  const { showSnackbar } = useSnackbarStore();

  const createToggleHandler = <T extends { id: string | number }>({
    checkFn,
    addFn,
    removeFn,
    addMessage,
    removeMessage,
  }: {
    checkFn: (id: string | number) => boolean;
    addFn: (item: T) => void;
    removeFn: (id: string | number) => void;
    addMessage: string;
    removeMessage: string;
  }) => {
    return (item: T) => {
      if (checkFn(item.id)) {
        removeFn(item.id);
        showSnackbar(removeMessage, "info");
      } else {
        addFn(item);
        showSnackbar(addMessage, "info");
      }
    };
  };

  return { createToggleHandler };
};

export default useToggleActions;