import { create } from 'zustand'
import { CartItem, CartStore } from './types'

const localStorageKey = 'cart_items'

export const useCartStore = create<CartStore>((set) => ({
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    cartOpen: false,
    cartTimeout: null,

    initializeCart: () => {
        const storedItems = localStorage.getItem(localStorageKey)
        if (storedItems) {
        const parsedItems = JSON.parse(storedItems)
        set({
            items: parsedItems,
            totalQuantity: parsedItems.reduce((total: number, item: CartItem) => total + item.quantity, 0),
            totalPrice: parsedItems.reduce((total: number, item: CartItem) => total + item.productPrice * item.quantity, 0)
        })
        }
    },

    addItem: (item: CartItem) =>
        set((state) => {
        const existingItem = state.items.find((i) => i.productId === item.productId)
        let updatedItems

        if (existingItem) {
            updatedItems = state.items.map((i) =>
            i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i
            )
        } else {
            updatedItems = [...state.items, item]
        }

        localStorage.setItem(localStorageKey, JSON.stringify(updatedItems))

        if (state.cartTimeout) {
            clearTimeout(state.cartTimeout);
        }

        const timeout = setTimeout(() => {
            set({ cartOpen: false });
        }, 3000);

        return {
            items: updatedItems,
            totalQuantity: updatedItems.reduce((total, item) => total + item.quantity, 0),
            totalPrice: updatedItems.reduce((total: number, item: CartItem) => total + item.productPrice * item.quantity, 0),
            cartOpen: true,
            cartTimeout: timeout
        }
    }),

    removeItem: (id: number) =>
        set((state) => {
        const updatedItems = state.items.filter((item) => item.productId !== id)
        localStorage.setItem(localStorageKey, JSON.stringify(updatedItems))

        return {
            items: updatedItems,
            totalQuantity: updatedItems.reduce((total, item) => total + item.quantity, 0),
            totalPrice: updatedItems.reduce((total: number, item: CartItem) => total + item.productPrice * item.quantity, 0)
        }
    }),

    clearCart: () => {
        localStorage.removeItem(localStorageKey)
        set({ items: [], totalQuantity: 0 })
    },

    toggleCart: (open: boolean) => set((state) => {
        if(state.cartTimeout) {
            clearTimeout(state.cartTimeout);
        }

        return {
            cartOpen: open
        }
    })
}))