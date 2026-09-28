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

type StoreState = {
  cart: CartLine[];
  wishlist: string[];
  discountCode: string | null;
};

type StoreContextValue = StoreState & {
  addToCart: (productId: string, variant?: string, quantity?: number) => void;
  setQuantity: (productId: string, variant: string | undefined, quantity: number) => void;
  removeLine: (productId: string, variant?: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  applyDiscount: (code: string) => boolean;
  cartCount: number;
  lines: { line: CartLine; product: Product }[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
};

const StoreContext = createContext<StoreContextValue | null>(null);
const STORAGE_KEY = "maison-etage-store-v1";
const DISCOUNTS: Record<string, number> = { WELCOME10: 0.1, STUDIO15: 0.15 };
const FREE_SHIPPING_THRESHOLD = 120;
const SHIPPING_FEE = 12;

const sameLine = (line: CartLine, productId: string, variant?: string) =>
  line.productId === productId && (line.variant ?? "") === (variant ?? "");

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>({ cart: [], wishlist: [], discountCode: null });

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setState((prev) => ({ ...prev, ...(JSON.parse(raw) as StoreState) }));
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

  const value = useMemo<StoreContextValue>(() => {
    const lines = state.cart
      .map((line) => {
        const product = products.find((p) => p.id === line.productId);
        return product ? { line, product } : null;
      })
      .filter((entry): entry is { line: CartLine; product: Product } => entry !== null);

    const subtotal = lines.reduce((sum, { line, product }) => sum + product.price * line.quantity, 0);
    const rate = state.discountCode ? (DISCOUNTS[state.discountCode] ?? 0) : 0;
    const discount = Math.round(subtotal * rate * 100) / 100;
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
      cartCount: state.cart.reduce((sum, line) => sum + line.quantity, 0),
      lines,
      subtotal,
      discount,
      shipping,
      total: Math.max(0, subtotal - discount + shipping),
    };
  }, [state, addToCart, setQuantity, removeLine, clearCart, toggleWishlist, applyDiscount]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export const FREE_SHIPPING = FREE_SHIPPING_THRESHOLD;
