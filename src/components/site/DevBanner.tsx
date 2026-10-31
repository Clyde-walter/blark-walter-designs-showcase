import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const KEY = "bw-dev-banner-dismissed";

export function DevBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(sessionStorage.getItem(KEY) !== "1");
  }, []);
  if (!show) return null;
  return (
    <div className="relative bg-primary px-10 py-2 text-center text-xs font-medium text-primary-foreground sm:text-sm">
      🚧 This site is still under development — new work is being added, but I'm open for projects.{" "}
      <Link to="/contact" className="font-semibold underline underline-offset-2">
        Let's talk →
      </Link>
      <button
        aria-label="Dismiss banner"
        onClick={() => {
          sessionStorage.setItem(KEY, "1");
          setShow(false);
        }}
        className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full hover:bg-black/15"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
