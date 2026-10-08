import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const buttonStyles = cva(
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full text-center font-medium tracking-[0.18em] uppercase transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-umber",
        outline: "fill-sweep border border-foreground/25 text-foreground hover:text-background",
        subtle: "bg-secondary text-secondary-foreground hover:bg-sand",
        ghost: "text-foreground hover:bg-secondary/70",
      },
      size: {
        sm: "px-5 py-2.5 text-[0.62rem]",
        md: "px-7 py-3.5 text-[0.66rem]",
        lg: "px-9 py-4 text-[0.68rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>;

/** Reusable button. Outline variants fill left-to-right and invert on hover. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, children, ...props },
  ref,
) {
  return (
    <button ref={ref} className={cn(buttonStyles({ variant, size }), className)} {...props}>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );
});

export const buttonStylesFor = buttonStyles;
