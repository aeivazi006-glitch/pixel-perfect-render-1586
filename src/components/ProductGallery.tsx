import { useState } from "react";
import { cn } from "@/lib/utils";

/** Gallery with thumbnail switching and cursor-follow zoom on the main image. */
export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      <ul className="no-scrollbar flex gap-3 overflow-x-auto md:flex-col md:overflow-visible">
        {images.map((image, index) => (
          <li key={`${image}-${index}`} className="shrink-0">
            <button
              type="button"
              onClick={() => setActive(index)}
              aria-label={`View image ${index + 1}`}
              aria-current={index === active}
              className={cn(
                "block size-20 overflow-hidden border transition-colors md:size-24",
                index === active ? "border-foreground" : "border-transparent hover:border-input",
              )}
            >
              <img src={image} alt="" loading="lazy" className="size-full object-cover" />
            </button>
          </li>
        ))}
      </ul>

      <div
        className="relative flex-1 cursor-zoom-in overflow-hidden bg-linen"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMove}
      >
        <div className="aspect-4/5 w-full">
          <img
            src={images[active]}
            alt={alt}
            className="size-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: zoom ? "scale(1.8)" : "scale(1)", transformOrigin: origin }}
          />
        </div>
      </div>
    </div>
  );
}
