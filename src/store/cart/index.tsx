import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductItem } from "@/models/homeModel";
import clone from "lodash.clonedeep";

interface CartState {
  cart: ProductItem[];
  cartTotalItems: number;
  addToCart: (item: ProductItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  resetCart: () => void;
}

const useCartStore = create<CartState, any>(
  persist(
    (set) => ({
      cart: [],
      cartTotalItems: 0,
      addToCart: (item, qty = 1) =>
        set((state) => {
          const cartTotalItems = state.cartTotalItems + qty;
          if (!state.cart.length) {
            return { cart: [{ ...item, quantity: qty }], cartTotalItems };
          }
          const existingProduct = state?.cart
            ? state.cart.find((cartItem) => item.id === cartItem.id)
            : null;
          if (!existingProduct) {
            return {
              cart: [...state.cart, { ...item, quantity: qty }],
              cartTotalItems,
            };
          }

          const updatedCart = state.cart.map((cartItem) => {
            if (item.id === cartItem.id) {
              return {
                ...cartItem,
                quantity: (cartItem?.quantity ?? 0) + qty,
              };
            }
            return cartItem;
          });

          return { cart: updatedCart, cartTotalItems };
        }),

      removeFromCart: (itemId) =>
        set((state) => {
          const newList = state.cart.reduce(
            (acc: ProductItem[], it: ProductItem) => {
              if (it.id == itemId) {
                const cartItemQuantity = it.quantity ?? 1;
                if (cartItemQuantity > 1) {
                  const newItem: ProductItem = {
                    ...it,
                    quantity: cartItemQuantity - 1,
                  };
                  return [...acc, newItem];
                } else {
                  return acc;
                }
              }
              console.log(it, "it");
              return [it, ...acc];
            },
            [] as ProductItem[]
          );

          return {
            cart: newList,
            cartTotalItems: state.cartTotalItems - 1,
          };
        }),

      resetCart: () =>
        set((state) => {
          return {
            cart: [],
            cartTotalItems: 0,
          };
        }),
    }),

    {
      name: "cart-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useCartStore;
