import { useEffect, useState } from "react";

const DEFAULT_ROLES = [
  "UI/UX Designer & Brand Designer",
  "Frontend Developer",
  "Full-Stack Developer",
  "AI Web Developer",
];

const TYPE_MS = 70;
const DELETE_MS = 35;
const HOLD_MS = 1600;

export function TypewriterRoles({
  roles = DEFAULT_ROLES,
  className = "",
}: {
  roles?: string[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setText(roles[0]);
      return;
    }

    const current = roles[index % roles.length];

    if (!deleting && text === current) {
      const hold = window.setTimeout(() => setDeleting(true), HOLD_MS);
      return () => window.clearTimeout(hold);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % roles.length);
      return;
    }

    const tick = window.setTimeout(
      () => {
        setText((t) =>
          deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1),
        );
      },
      deleting ? DELETE_MS : TYPE_MS,
    );
    return () => window.clearTimeout(tick);
  }, [text, deleting, index, roles]);

  return (
    <p className={`min-h-[3.5rem] text-lg font-medium text-foreground sm:min-h-[2rem] ${className}`}>
      <span>{text}</span>
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block w-[2px] translate-y-[2px] bg-primary align-middle"
        style={{ height: "1.1em", animation: "bwd-caret 1s steps(1) infinite" }}
      />
      <span className="sr-only">UI/UX Designer, Brand Designer, Frontend, Full-Stack and AI Web Developer</span>
    </p>
  );
}
