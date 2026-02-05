import { useEffect, useState } from "react";

export function Scanlines() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      style={{
        background: `repeating-linear-gradient(
          0deg,
          transparent 0px,
          transparent 1px,
          var(--scanline) 1px,
          var(--scanline) 2px
        )`,
      }}
    />
  );
}
