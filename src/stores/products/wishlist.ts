import type { ProductDTO } from "~/utils/types";

type WishlistProduct = ProductDTO & { count: number };

const useWishListStore = () => {
  const wishlist = useState<WishlistProduct[]>("wishlist", () => []);

  /**
   * Adds a product to the wishlist or increments its count if it already exists.
   * @param product - The product to add.
   */
  const addToWishlist = (product: ProductDTO) => {
    const existingItem = wishlist.value.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.count = existingItem.count + 1;
    } else {
      wishlist.value.push({ ...product, count: 1 });
    }
  };
  /**
   * Removes a product from the wishlist by product ID.
   * @param productId - The ID of the product to remove.
   */
  const removeFromWishlist = (productId: string | number) => {
    wishlist.value = wishlist.value.filter((item) => item.id !== productId);
  };

  /**
   * Checks if a product is in the wishlist.
   * @param productId - The product ID to check.
   * @returns True if product is in the wishlist, false otherwise.
   */
  const isInWishlist = (productId: string | number): boolean => {
    return wishlist.value.some((item) => item.id === productId);
  };

  return { wishlist, addToWishlist, removeFromWishlist, isInWishlist };
};

export default useWishListStore;
