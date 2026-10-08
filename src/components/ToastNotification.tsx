import { Toaster as SonnerToaster, toast } from "sonner";

/**
 * Toast notification surface for the storefront.
 * Add-to-cart and wishlist actions confirm through `notifyCart` / `notifyWishlist`
 * so every confirmation reads the same way.
 */
export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      offset={20}
      gap={10}
      visibleToasts={3}
      toastOptions={{
        unstyled: true,
        classNames: { toast: "toast-in" },
      }}
    />
  );
}

export function notifyCart(productName: string, quantity = 1) {
  toast.custom(
    () => (
      <div className="pointer-events-auto flex w-[18rem] items-center gap-3 rounded-xl border border-border bg-popover/95 p-3 shadow-lift backdrop-blur-md">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-[0.65rem] tracking-[0.06em]">
          {quantity}×
        </span>
        <span className="min-w-0">
          <span className="block text-[0.6rem] tracking-[0.18em] uppercase text-clay">
            Added to cart
          </span>
          <span className="mt-0.5 block truncate text-sm">{productName}</span>
        </span>
      </div>
    ),
    { duration: 2600 },
  );
}

export function notifyWishlist(productName: string, saved: boolean) {
  toast.custom(
    () => (
      <div className="pointer-events-auto flex w-[18rem] items-center gap-3 rounded-xl border border-border bg-popover/95 p-3 shadow-lift backdrop-blur-md">
        <span
          className={
            saved
              ? "size-2 shrink-0 rounded-full bg-clay"
              : "size-2 shrink-0 rounded-full bg-stone"
          }
        />
        <span className="min-w-0">
          <span className="block text-[0.6rem] tracking-[0.18em] uppercase text-muted-foreground">
            {saved ? "Saved to wishlist" : "Removed from wishlist"}
          </span>
          <span className="mt-0.5 block truncate text-sm">{productName}</span>
        </span>
      </div>
    ),
    { duration: 2200 },
  );
}
