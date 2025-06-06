import type { ProductDTO } from "~/utils/types";

type CartProduct = ProductDTO & { count: number };

const useCardStore = () => {
  const card = useState<CartProduct[]>("card", () => []);

  /**
   * Adds a product to the cart.
   * If product exists, increments its count.
   * Otherwise, adds with count 1.
   *
   * @param product - The product to add.
   */
  const addToCard = (product: ProductDTO) => {
    const existingItem = card.value.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.count = existingItem.count + 1;
    } else {
      card.value.push({ ...product, count: 1 });
    }
  };

  /**
   * Removes a product from the cart by its id.
   *
   * @param productId - ID of the product to remove.
   */
  const removeFromCard = (productId: string | number) => {
    card.value = card.value.filter((item) => item.id !== productId);
  };

  /**
   * Checks if a product is currently in the cart.
   *
   * @param productId - ID to check.
   * @returns true if product exists in cart, else false.
   */
  const isInCard = (productId: string | number): boolean => {
    return card.value.some((item) => item.id === productId);
  };

  return { card, addToCard, removeFromCard, isInCard };
};

export default useCardStore;
