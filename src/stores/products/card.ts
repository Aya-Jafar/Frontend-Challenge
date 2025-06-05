import type { ProductDTO } from "~/utils/types";

type CartProduct = ProductDTO & { count: number };

const useCardStore = () => {
  const card = useState<CartProduct[]>("card", () => []);

  const addToCard = (product: ProductDTO) => {
    const existingItem = card.value.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.count = existingItem.count + 1;
    } else {
      card.value.push({ ...product, count: 1 });
    }
  };

  const removeFromCard = (productId: string | number) => {
    card.value = card.value.filter((item) => item.id !== productId);
  };
  const isInCard = (productId: string | number): boolean => {
    return card.value.some((item) => item.id === productId);
  }

  return { card, addToCard, removeFromCard, isInCard };
};

export default useCardStore;
