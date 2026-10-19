"use client";

import { useEffect } from "react";

// People who open a shared result go straight to the full result on the dashboard; link previews read this page's tags.
export default function Forward({ to }: { to: string }) {
  useEffect(() => {
    const t = setTimeout(() => window.location.replace(to), 150);
    return () => clearTimeout(t);
  }, [to]);
  return null;
}
