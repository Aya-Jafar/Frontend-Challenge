import type { ProductDTO } from "~/utils/types";

type WishlistProduct = ProductDTO & { count: number };

const useWishListStore = () => {
  const wishlist = useState<WishlistProduct[]>("wishlist", () => []);

  const addToWishlist = (product: ProductDTO) => {
    const existingItem = wishlist.value.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.count = existingItem.count + 1;
    } else {
      wishlist.value.push({ ...product, count: 1 });
    }
  };

  const removeFromWishlist = (productId: string | number) => {
    wishlist.value = wishlist.value.filter((item) => item.id !== productId);
  };

  const isInWishlist = (productId: string | number): boolean => {
    return wishlist.value.some((item) => item.id === productId);
  };

  return { wishlist, addToWishlist, removeFromWishlist, isInWishlist };
};

export default useWishListStore;
