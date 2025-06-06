import { useSnackbarStore } from "../snackbar";

/**
 * Provides a toggle handler creator to add or remove items with snackbar notifications.
 *
 * @returns An object containing `createToggleHandler` function.
 */
const useToggleActions = () => {
  const { showSnackbar } = useSnackbarStore();

  /**
   * Creates a toggle handler that adds or removes an item based on its presence.
   * Shows snackbar messages on toggle actions.
   *
   * @param params - Object containing handler functions and messages.
   * @param params.checkFn - Function to check if the item is present by id.
   * @param params.addFn - Function to add the item.
   * @param params.removeFn - Function to remove the item by id.
   * @param params.addMessage - Message shown when item is added.
   * @param params.removeMessage - Message shown when item is removed.
   * @returns A function that toggles the item presence and triggers snackbar notifications.
   */
  const createToggleHandler = ({
    checkFn,
    addFn,
    removeFn,
    addMessage,
    removeMessage,
  }: {
    checkFn: (id: string | number) => boolean;
    addFn: (item: any) => void;
    removeFn: (id: string | number) => void;
    addMessage: string;
    removeMessage: string;
  }) => {
    return (item: any) => {
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
