import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "@/data/catalog";

export type CartLine = {
  productId: string;
  variant?: string;
  quantity: number;
};

type PersistedState = {
  cart: CartLine[];
  wishlist: string[];
  discountCode: string | null;
  recentSearches: string[];
  recentlyViewed: string[];
};

type StoreContextValue = PersistedState & {
  addToCart: (productId: string, variant?: string, quantity?: number) => void;
  setQuantity: (productId: string, variant: string | undefined, quantity: number) => void;
  removeLine: (productId: string, variant?: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  applyDiscount: (code: string) => boolean;
  removeDiscount: () => void;
  pushSearch: (term: string) => void;
  clearSearches: () => void;
  markViewed: (productId: string) => void;
  /* transient UI state */
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  /* derived */
  cartCount: number;
  lines: { line: CartLine; product: Product }[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
};

const StoreContext = createContext<StoreContextValue | null>(null);
const STORAGE_KEY = "moderno-store-v1";
const DISCOUNTS: Record<string, number> = { WELCOME10: 0.1, STUDIO15: 0.15, MODERNO20: 0.2 };
/** Prices are quoted in Toman. */
export const FREE_SHIPPING_THRESHOLD = 5000000;
const SHIPPING_FEE = 350000;
const MAX_RECENT = 6;

const emptyState: PersistedState = {
  cart: [],
  wishlist: [],
  discountCode: null,
  recentSearches: [],
  recentlyViewed: [],
};

const sameLine = (line: CartLine, productId: string, variant?: string) =>
  line.productId === productId && (line.variant ?? "") === (variant ?? "");

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(emptyState);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setState((prev) => ({ ...prev, ...(JSON.parse(raw) as PersistedState) }));
    } catch {
      /* ignore unreadable storage */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore quota errors */
    }
  }, [state]);

  const addToCart = useCallback((productId: string, variant?: string, quantity = 1) => {
    setState((prev) => {
      const existing = prev.cart.find((line) => sameLine(line, productId, variant));
      const cart = existing
        ? prev.cart.map((line) =>
            sameLine(line, productId, variant)
              ? { ...line, quantity: line.quantity + quantity }
              : line,
          )
        : [...prev.cart, { productId, variant, quantity }];
      return { ...prev, cart };
    });
  }, []);

  const setQuantity = useCallback(
    (productId: string, variant: string | undefined, quantity: number) => {
      setState((prev) => ({
        ...prev,
        cart: prev.cart
          .map((line) =>
            sameLine(line, productId, variant) ? { ...line, quantity: Math.max(0, quantity) } : line,
          )
          .filter((line) => line.quantity > 0),
      }));
    },
    [],
  );

  const removeLine = useCallback((productId: string, variant?: string) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart.filter((line) => !sameLine(line, productId, variant)),
    }));
  }, []);

  const clearCart = useCallback(
    () => setState((prev) => ({ ...prev, cart: [], discountCode: null })),
    [],
  );

  const toggleWishlist = useCallback((productId: string) => {
    setState((prev) => ({
      ...prev,
      wishlist: prev.wishlist.includes(productId)
        ? prev.wishlist.filter((id) => id !== productId)
        : [...prev.wishlist, productId],
    }));
  }, []);

  const applyDiscount = useCallback((code: string) => {
    const key = code.trim().toUpperCase();
    if (!DISCOUNTS[key]) return false;
    setState((prev) => ({ ...prev, discountCode: key }));
    return true;
  }, []);

  const removeDiscount = useCallback(
    () => setState((prev) => ({ ...prev, discountCode: null })),
    [],
  );

  const pushSearch = useCallback((term: string) => {
    const value = term.trim();
    if (!value) return;
    setState((prev) => ({
      ...prev,
      recentSearches: [value, ...prev.recentSearches.filter((item) => item !== value)].slice(
        0,
        MAX_RECENT,
      ),
    }));
  }, []);

  const clearSearches = useCallback(() => setState((prev) => ({ ...prev, recentSearches: [] })), []);

  const markViewed = useCallback((productId: string) => {
    setState((prev) => ({
      ...prev,
      recentlyViewed: [productId, ...prev.recentlyViewed.filter((id) => id !== productId)].slice(
        0,
        8,
      ),
    }));
  }, []);

  const value = useMemo<StoreContextValue>(() => {
    const lines = state.cart
      .map((line) => {
        const product = products.find((p) => p.id === line.productId);
        return product ? { line, product } : null;
      })
      .filter((entry): entry is { line: CartLine; product: Product } => entry !== null);

    const subtotal = lines.reduce((sum, { line, product }) => sum + product.price * line.quantity, 0);
    const rate = state.discountCode ? (DISCOUNTS[state.discountCode] ?? 0) : 0;
    const discount = Math.round(subtotal * rate);
    const shipping =
      subtotal === 0 || subtotal - discount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

    return {
      ...state,
      addToCart,
      setQuantity,
      removeLine,
      clearCart,
      toggleWishlist,
      isWishlisted: (productId: string) => state.wishlist.includes(productId),
      applyDiscount,
      removeDiscount,
      pushSearch,
      clearSearches,
      markViewed,
      cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      searchOpen,
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
      cartCount: state.cart.reduce((sum, line) => sum + line.quantity, 0),
      lines,
      subtotal,
      discount,
      shipping,
      total: Math.max(0, subtotal - discount + shipping),
    };
  }, [
    state,
    cartOpen,
    searchOpen,
    addToCart,
    setQuantity,
    removeLine,
    clearCart,
    toggleWishlist,
    applyDiscount,
    removeDiscount,
    pushSearch,
    clearSearches,
    markViewed,
  ]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export const FREE_SHIPPING = FREE_SHIPPING_THRESHOLD;
